import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber, useThree } from '@react-three/fiber';
import { shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. The GLSL Shader
// --------------------------------------------------------

const AuraShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    // Brighter, more vibrant default colors
    uColor1: new THREE.Color('#4a00e0'), // Indigo
    uColor2: new THREE.Color('#ff0055'), // Hot Pink
    uColor3: new THREE.Color('#ffcc00'), // Bright Gold/Orange
    uResolution: new THREE.Vector2(1, 1), // Screen dimensions
  },
  // Vertex Shader (Standard)
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Vibrant Smoke Logic)
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // --- Noise Functions (Standard FBM) ---
    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);
        // Cubic Hermite Curve
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    #define NUM_OCTAVES 4
    float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + vec2(100.0);
            a *= 0.5;
        }
        return v;
    }

    // 3-Stop Color Gradient Helper
    vec3 threeColorGradient(vec3 c1, vec3 c2, vec3 c3, float t) {
        // t is 0-1. 
        // If t < 0.5, mix c1 & c2. If t > 0.5, mix c2 & c3.
        float firstHalf = smoothstep(0.0, 0.5, t);
        float secondHalf = smoothstep(0.5, 1.0, t);
        
        vec3 mixed = mix(c1, c2, firstHalf);
        mixed = mix(mixed, c3, secondHalf);
        return mixed;
    }

    void main() {
        // Normalize UVs based on aspect ratio so smoke doesn't stretch
        vec2 st = vUv * uResolution / min(uResolution.x, uResolution.y);
        
        float time = uTime * 0.2; 

        // --- Domain Warping (Smoke Physics) ---
        // We use noise to distort the coordinate system itself
        vec2 q = vec2(0.);
        q.x = fbm(st + 0.1 * time);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);

        float f = fbm(st + r);

        // --- Color Application ---
        // Instead of using noise directly for color, we use the warped coordinates.
        // This ensures the horizontal spectrum (Blue -> Pink -> Orange) remains intact
        // but gets pushed around by the smoke physics.
        
        // Create a "distorted X" coordinate. 
        // vUv.x sets the base spectrum. 'f' and 'q.x' add the smoky distortion.
        float distortedHorizontal = smoothstep(0.0, 1.0, vUv.x + (f*q.x*0.8) - 0.4);
        
        vec3 color = threeColorGradient(uColor1, uColor2, uColor3, distortedHorizontal);

        // --- Vibrancy boost ---
        // Increase saturation in smoky areas
        color = mix(color, color * 1.4, f);


        // --- The Aura Mask (Bottom Emanation) ---
        // Strict gradient from bottom up. 
        // Starts fading immediately, gone by 65% up the screen.
        float bottomMask = smoothstep(0.65, 0.0, vUv.y); 
        
        // Add smoke texture to the edges of the mask
        float smokeEdge = smoothstep(0.2, 0.8, f) * 0.5 + 0.5;
        
        vec3 finalColor = color * bottomMask * smokeEdge;

        // Final gamma correction for extra pop (makes darks darker, brights brighter)
        finalColor = pow(finalColor, vec3(0.8)); 

        gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ AuraShaderMaterial });

// Add types for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      auraShaderMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof AuraShaderMaterial> & {
        uTime?: number;
        uResolution?: THREE.Vector2;
        uColor1?: THREE.Color;
        uColor2?: THREE.Color;
        uColor3?: THREE.Color;
      };
    }
  }
}

// --------------------------------------------------------
// 2. The Scene Component
// --------------------------------------------------------

interface AuraProps {
  colors?: [string, string, string];
}

const AuraScene: React.FC<AuraProps> = ({ colors }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  // Get the size of the canvas viewport
  const { viewport, size } = useThree();

  // Memoize colors if provided, otherwise use shader defaults
  const c1 = useMemo(() => colors ? new THREE.Color(colors[0]) : undefined, [colors]);
  const c2 = useMemo(() => colors ? new THREE.Color(colors[1]) : undefined, [colors]);
  const c3 = useMemo(() => colors ? new THREE.Color(colors[2]) : undefined, [colors]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Update resolution uniform when screen resizes
  React.useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  }, [size])

  return (
    // Plane now scales to fill the exact viewport dimensions
    <Plane args={[1, 1]} scale={[viewport.width, viewport.height, 1]}>
      <auraShaderMaterial
        ref={materialRef}
        {...(c1 && { uColor1: c1 })}
        {...(c2 && { uColor2: c2 })}
        {...(c3 && { uColor3: c3 })}
        transparent={true}
      />
    </Plane>
  );
};

// --------------------------------------------------------
// 3. The Exported Container
// --------------------------------------------------------

interface AuraBackgroundProps {
  className?: string;
  // Optional: override default colors defined in shader
  colors?: [string, string, string];
}

export const AuraBackground: React.FC<AuraBackgroundProps> = ({ className, colors }) => {
  return (
    // Ensure container is full width/height of parent
    <div className={`absolute inset-0 -z-10 bg-black ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        // Orthographic camera is often easier for full-screen 2D effects, 
        // but perspective works here because we scale the plane to the viewport.
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Optimize for varied pixel densities
        gl={{
          antialias: false, // Not needed for smoke
          powerPreference: "high-performance",
          alpha: false // We are blending onto a black background in shader
        }}
      >
        <AuraScene colors={colors} />
      </Canvas>
    </div>
  );
};

export default AuraBackground;
