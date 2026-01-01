'use client';
import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const getThemeColor = (variableName: string, fallback: string) => {
  if (typeof window === 'undefined') return new THREE.Color(fallback);
  const tempDiv = document.createElement('div');
  tempDiv.style.display = 'none';
  document.body.appendChild(tempDiv);
  tempDiv.style.color = `var(${variableName})`;
  let computed = window.getComputedStyle(tempDiv).color;
  if (!computed || computed === '' || computed === 'rgba(0, 0, 0, 0)') {
    tempDiv.style.color = `oklch(var(${variableName}))`;
    computed = window.getComputedStyle(tempDiv).color;
  }
  document.body.removeChild(tempDiv);
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (ctx) {
    ctx.fillStyle = computed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return new THREE.Color(r / 255, g / 255, b / 255);
  }
  return new THREE.Color(fallback);
};

interface StarryAuraProps {
  gridDensity?: number;
  dotSize?: number;
  twinkleSpeed?: number;
  twinkleSharpness?: number;
  sparsity?: number;
  baseOpacity?: number;
  accentOpacity?: number;
  bgVariable?: string;
  accentVariable?: string;
}

const StarryGridShader = ({
  gridDensity = 170,
  dotSize = 0.200,
  twinkleSpeed = 1.50,
  twinkleSharpness = 0.50,
  sparsity = 0.05,
  baseOpacity = 0.010,
  accentOpacity = 0.300,
  bgVariable = '--background-900',
  accentVariable = '--accent-500'
}: StarryAuraProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_grid_density: { value: gridDensity },
    u_dot_size: { value: dotSize },
    u_speed: { value: twinkleSpeed },
    u_sharpness: { value: twinkleSharpness },
    u_sparsity: { value: sparsity },
    u_base_opacity: { value: baseOpacity },
    u_accent_opacity: { value: accentOpacity },
    u_is_dark: { value: 1.0 },
    u_background: { value: new THREE.Color(0, 0, 0) },
    u_accent: { value: new THREE.Color(1, 1, 1) },
  }), [gridDensity, dotSize, twinkleSpeed, twinkleSharpness, sparsity, baseOpacity, accentOpacity]);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    const updateColors = () => {
      if (meshRef.current) {
        const mat = meshRef.current.material as THREE.ShaderMaterial;
        const bgColor = getThemeColor(bgVariable, '#000000');
        const accentColor = getThemeColor(accentVariable, '#ffffff');
        const luminance = (0.299 * bgColor.r + 0.587 * bgColor.g + 0.114 * bgColor.b);
        mat.uniforms.u_is_dark.value = luminance < 0.5 ? 1.0 : 0.0;
        mat.uniforms.u_background.value.copy(bgColor);
        mat.uniforms.u_accent.value.copy(accentColor);
      }
    };
    const throttledUpdate = () => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        updateColors();
        throttleTimeout = null;
      }, 100);
    };
    updateColors();
    const observer = new MutationObserver(throttledUpdate);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => {
      observer.disconnect();
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [bgVariable, accentVariable]);

  useFrame((state) => {
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.elapsedTime;
    mat.uniforms.u_resolution.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform float u_grid_density;
          uniform float u_dot_size;
          uniform float u_speed;
          uniform float u_sharpness;
          uniform float u_sparsity;
          uniform float u_base_opacity;
          uniform float u_accent_opacity;
          uniform float u_is_dark;
          uniform vec3 u_background;
          uniform vec3 u_accent;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
            vec2 uv = vUv * aspect;
            vec2 gridUv = fract(uv * u_grid_density) - 0.5;
            vec2 cellId = floor(uv * u_grid_density);
            float dotRandom = hash(cellId);
            
            // --- GRADIENT LOGIC ---
            // vUv.y is 1.0 at the top and 0.0 at the bottom.
            // yFactor is 0.0 at the top and 1.0 at the bottom.
            float yFactor = pow(1.0 - vUv.y, 1.5); 
            
            // Increase sparsity threshold at the top (top requires dotRandom to be higher to show)
            float dynamicSparsity = mix(1.0, u_sparsity, yFactor);
            float canTwinkle = smoothstep(dynamicSparsity, dynamicSparsity + 0.05, dotRandom);
            
            float speed = (0.5 + dotRandom) * u_speed;
            float phase = dotRandom * 6.28;
            float twinkle = sin(u_time * speed + phase) * 0.5 + 0.5;
            
            // Multiply twinkle by yFactor so stars at the top are physically dimmer
            twinkle = pow(twinkle, u_sharpness) * canTwinkle * yFactor; 

            float themeAdjustedBase = mix(u_base_opacity * 0.3, u_base_opacity, u_is_dark);
            // Apply gradient to base opacity as well so the background dots fade out at top
            float finalBase = themeAdjustedBase * yFactor;
            float intensity = finalBase + (twinkle * u_accent_opacity);

            float dotDist = length(gridUv);
            float dotMask = smoothstep(u_dot_size, u_dot_size - 0.1, dotDist);

            vec3 finalColor = mix(u_background, u_accent, twinkle);
            gl_FragColor = vec4(finalColor, dotMask * intensity);
          }
        `}
      />
    </mesh>
  );
};

export default function StarryAura(props: StarryAuraProps) {
  return (
    <div className="absolute inset-0 h-full w-full -z-10 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <StarryGridShader {...props} />
      </Canvas>
    </div>
  );
}
