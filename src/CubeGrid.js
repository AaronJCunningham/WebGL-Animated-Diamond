import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import { OrbitControls, Stats } from 'drei'
import './styles.css'

const size = 125000
const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(size).fill().map(() => niceColors[17][Math.floor(Math.random() * 5)])

function Boxes() {
  const colorArray = useMemo(() => Float32Array.from(new Array(size).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])
  const ref = useRef()
  useLayoutEffect(() => {
    let i = 0
    for (let x = 0; x < 50; x++)
      for (let y = 0; y < 50; y++)
        for (let z = 0; z < 50; z++) {
          const id = i++
          tempObject.position.set(25 - x, 25 - y, 25 - z)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, size]}>
      <boxBufferGeometry attach="geometry" args={[0.15, 0.15, 0.15]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshLambertMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

ReactDOM.render(
  <Canvas camera={{ position: [0, 0, 0.1] }} onCreated={({ gl }) => gl.setClearColor('lightpink')}>
    <ambientLight />
    <directionalLight position={[150, 150, 150]} intensity={0.55} />
    <Boxes />
    <OrbitControls enablePan={false} autoRotate />
    <Stats />
  </Canvas>,
  document.getElementById('root')
)
