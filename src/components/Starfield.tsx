import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

type StarfieldProps = {
  interactive?: boolean
  className?: string
}

function Stars({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 1800

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 28
      positions[i3 + 1] = (Math.random() - 0.5) * 18
      positions[i3 + 2] = (Math.random() - 0.5) * 16
      sizes[i] = Math.random() * 1.6 + 0.3
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, sizes, phases }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#f0d9b5') },
    }),
    [],
  )

  useFrame((state) => {
    const pts = pointsRef.current
    if (!pts) return
    const t = state.clock.elapsedTime
    pts.rotation.y = t * 0.015 + mouse.current.x * 0.12
    pts.rotation.x = mouse.current.y * 0.08
    ;(pts.material as THREE.ShaderMaterial).uniforms.uTime.value = t
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          attribute float aSize;
          attribute float aPhase;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float twinkle = 0.65 + 0.35 * sin(uTime * 1.8 + aPhase);
            vAlpha = twinkle;
            gl_PointSize = aSize * (280.0 / -mv.z) * twinkle;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
            gl_FragColor = vec4(uColor, alpha * 0.85);
          }
        `}
      />
    </points>
  )
}

function StarScene({ interactive }: { interactive: boolean }) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!interactive) return
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [interactive])

  return <Stars mouse={mouse} />
}

export function Starfield({ interactive = true, className }: StarfieldProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <StarScene interactive={interactive} />
      </Canvas>
    </div>
  )
}
