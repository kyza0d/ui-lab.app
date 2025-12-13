'use client';
import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AuraProps {
  strength?: number;
  radius?: number;
  clearing?: number;
  distortion?: number;
  irregularity?: number;
  speed?: number;
  idleDrift?: number;
}

const AuraShader = ({
  strength = 1.4,
  radius = 0.2,
  clearing = 1.1,
  distortion = 0.0,
  irregularity = 1.2,
  speed = 1.0,
  idleDrift = 0.3,
}: AuraProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_intro: { value: 0 }, // New uniform for entrance animation
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_mouse_active: { value: 0 },
    u_strength: { value: strength },
    u_radius: { value: radius },
    u_clearing: { value: clearing },
    u_distortion: { value: distortion },
    u_irregularity: { value: irregularity },
    u_accent_50: { value: new THREE.Color(1, 1, 1) },
    u_accent_300: { value: new THREE.Color(1, 0.8, 1) },
    u_accent_500: { value: new THREE.Color(1, 0.5, 1) },
    u_bg_800: { value: new THREE.Color(0, 0, 0) },
  }), [strength, radius, clearing, distortion, irregularity]);

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

  useEffect(() => {
    const updateColors = () => {
      const mat = meshRef.current?.material as THREE.ShaderMaterial;
      if (mat) {
        mat.uniforms.u_accent_50.value.copy(getThemeColor('--accent-500', '#ffffff'));
        mat.uniforms.u_accent_300.value.copy(getThemeColor('--accent-500', '#dddddd'));
        mat.uniforms.u_accent_500.value.copy(getThemeColor('--accent-700', '#aaaaaa'));
        mat.uniforms.u_bg_800.value.copy(getThemeColor('--background-950', '#333333'));
      }
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    return () => observer.disconnect();
  }, []);

  const mouse = useRef({
    x: 0.5, y: 0.5, active: false, velocity: new THREE.Vector2(0, 0),
  });
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = document.body.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const x = clientX / rect.width;
      const y = 1.0 - clientY / rect.height;
      const current = mouse.current;
      current.velocity.x = x - current.x;
      current.velocity.y = y - current.y;
      current.x = x;
      current.y = y;
      current.active = true;
    };
    const handleLeaveOrEnd = () => { mouse.current.active = false; };

    window.addEventListener('mousemove', handleMove as any);
    window.addEventListener('touchmove', handleMove as any, { passive: true });
    window.addEventListener('touchstart', handleMove as any, { passive: true });
    window.addEventListener('mouseleave', handleLeaveOrEnd);
    window.addEventListener('touchend', handleLeaveOrEnd);
    window.addEventListener('touchcancel', handleLeaveOrEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('touchstart', handleMove as any);
      window.removeEventListener('mouseleave', handleLeaveOrEnd);
      window.removeEventListener('touchend', handleLeaveOrEnd);
      window.removeEventListener('touchcancel', handleLeaveOrEnd);
    };
  }, []);

  useFrame((state) => {
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    if (mat) {
      const time = state.clock.elapsedTime;
      mat.uniforms.u_time.value = time;
      mat.uniforms.u_strength.value = strength;
      mat.uniforms.u_radius.value = radius;
      mat.uniforms.u_clearing.value = clearing;
      mat.uniforms.u_distortion.value = distortion;
      mat.uniforms.u_irregularity.value = irregularity;

      // --- INTRO ANIMATION LOGIC ---
      // Define duration in seconds
      const introDuration = 4.0;
      // Calculate progress (0 to 1)
      let progress = Math.min(time / introDuration, 1.0);
      // Ease Out Cubic for a smooth "settle" effect
      progress = 1.0 - Math.pow(1.0 - progress, 3.0);
      mat.uniforms.u_intro.value = progress;
      // -----------------------------

      const current = mouse.current;
      const target = new THREE.Vector2(current.x, current.y);

      if (current.active) {
        prevMouse.current.lerp(target, 0.25);
      } else if (idleDrift > 0) {
        const drift = new THREE.Vector2(
          Math.sin(time * 0.07) * 0.0012,
          Math.cos(time * 0.09 + 1.7) * 0.0009
        );
        target.add(drift.multiplyScalar(idleDrift));
        prevMouse.current.lerp(target, 0.02);
      }

      const followSpeed = THREE.MathUtils.clamp(speed * 0.2, 0.05, 0.4);
      mat.uniforms.u_mouse.value.lerp(prevMouse.current, followSpeed);

      const targetActive = current.active ? 1.0 : 0.0;
      mat.uniforms.u_mouse_active.value = THREE.MathUtils.lerp(
        mat.uniforms.u_mouse_active.value,
        targetActive,
        followSpeed * 0.6
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
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
          uniform float u_intro; // 0.0 to 1.0
          uniform vec2 u_mouse;
          uniform float u_mouse_active;
          uniform float u_strength;
          uniform float u_radius;
          uniform float u_clearing;
          uniform float u_distortion;
          uniform float u_irregularity;
          
          uniform vec3 u_accent_50;
          uniform vec3 u_accent_300;
          uniform vec3 u_accent_500;
          uniform vec3 u_bg_800;

          varying vec2 vUv;
          
          float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f*f*(3.0-2.0*f);
            float a = hash(i);
            float b = hash(i + vec2(1.0,0.0));
            float c = hash(i + vec2(0.0,1.0));
            float d = hash(i + vec2(1.0,1.0));
            return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
          }

          float auroraField(vec2 uv, float seed) {
            float t = u_time * 0.12 + seed * 10.0;
            vec2 p = uv * vec2(1.8, 8.0) + vec2(t*0.3, -t*-0.9);
            float n = sin(p.x*1.3 + sin(p.y*0.4)) *
                      sin(p.x*2.7 + sin(p.y*0.22)) *
                      sin(p.x*5.1 + sin(p.y*0.11));
            return n*0.5 + 0.5;
          }

          float getRepulsionStrength(vec2 uv) {
            if (u_mouse_active < 0.01) return 0.0;
            vec2 toMouse = uv - u_mouse;
            vec2 nCoord = uv*4.0 + vec2(u_time*0.15, u_time*0.08);
            float irreg = (noise(nCoord)*0.25 + noise(nCoord*2.3 + 73.4)*0.12) * u_irregularity;
            float stretched = length(toMouse * vec2(0.9, 1.3));
            float dynamicRadius = u_radius + irreg;
            float strength = smoothstep(dynamicRadius + 0.15, dynamicRadius - 0.25, stretched);
            float angle = atan(toMouse.y, toMouse.x);
            float swirl = sin(angle*4.0 + u_time*0.8 + noise(uv*3.0)*6.28) * 0.15;
            strength += swirl * strength;
            return pow(strength, 0.7) * u_mouse_active * u_strength;
          }

          vec3 auroraColor(float t) {
            t = fract(t + 0.1);
            if (t < 0.25) return mix(u_accent_500, u_accent_300, t*4.0);
            if (t < 0.5) return mix(u_accent_300, u_accent_50, (t-0.25)*4.0);
            if (t < 0.75) return mix(u_accent_50, u_bg_800, (t-0.5)*4.0);
            return mix(u_bg_800, u_accent_500, (t-0.75)*4.0);
          }

          void main() {
            vec2 uv = vUv;
            
            // --- INTRO REVEAL CALCULATION ---
            // "Grow" from bottom (0.0) to top (1.0).
            // (u_intro * 1.3) allows the mask to go slightly above screen top to fully clear it.
            float verticalGrowth = smoothstep(0.0, 1.0, (u_intro * 1.3) - uv.y);
            // --------------------------------

            float repel = getRepulsionStrength(uv);
            vec2 pushDir = normalize(uv - u_mouse + vec2(
              noise(uv*5.0 + u_time*0.3)-0.5,
              noise(uv*5.0 + u_time*0.7 + 44.4)-0.5
            )*0.3);
            vec2 warpedUv = uv + pushDir * repel * u_distortion;
            
            // Base mask fading out at the top
            float mask = pow(1.0 - uv.y, 3.4);
           
            float glow = auroraField(warpedUv, 0.0);
            glow += auroraField(warpedUv + vec2(13.7,7.3), 1.1)*0.8;
            glow += auroraField(warpedUv + vec2(9.4,19.2), 2.3)*0.6;
            glow = pow(glow*0.33, 1.6);
           
            glow += sin(uv.y*12.0 - u_time*0.9)*0.04 +
                    sin(uv.y*25.0 - u_time*1.3)*0.02;
           
            glow *= (1.0 - repel * u_clearing);
            glow *= mask * 5.0;
           
            vec3 color = auroraColor(u_time*0.058 + uv.y*0.6 + glow*0.2);
            vec3 core = u_accent_50 + vec3(0.1);
            float coreMask = pow(mask, 0.35) * smoothstep(0.19, 0.0, uv.y);
            coreMask *= (1.0 - repel*0.7);
            color = mix(color, core, coreMask*0.85);
           
            vec3 final = color * glow;
            
            // Apply the vertical growth mask to the alpha
            float alpha = glow * mask * 1.7 * verticalGrowth;
            
            // CAPPING INTENSITY:
            // Ensure alpha doesn't get too intense. 
            // 0.85 is the max opacity, preventing it from blowing out the screen.
            alpha = clamp(alpha, 0.0, 0.85);

            gl_FragColor = vec4(final, alpha);
          }
        `}
      />
    </mesh>
  );
};

export default function Aura() {
  return (
    <div className="h-50 min-w-screen inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
        <AuraShader
          strength={10.00}
          radius={0.10}
          clearing={0.30}
          distortion={0.020}
          irregularity={1.10}
          speed={0.10}
          idleDrift={0.20}
        />
      </Canvas>
    </div>
  );
}
