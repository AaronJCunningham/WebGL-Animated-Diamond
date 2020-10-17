// import { TextureLoader, WebGLRenderTarget, Uncharted2ToneMapping } from "three"
// import React, { Suspense, useMemo, useRef } from "react"
// import ReactDOM from "react-dom"
// import { Canvas, useLoader, useThree, useFrame } from "react-three-fiber"
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// import BackfaceMaterial from "./backface-material"
// import RefractionMaterial from "./refraction-material"
// import diamondUrl from "./assets/diamond.glb"
// import textureUrl from "./assets/texture.jpg"
// import Effects from "./Effects"
// import "./styles.css"

// function Background() {
//   const { height } = useThree().viewport
//   const texture = useLoader(TextureLoader, textureUrl)
//   return (
//     <mesh layers={1} scale={[height * 2, height]}>
//       <planeBufferGeometry attach="geometry" />
//       <meshBasicMaterial attach="material" map={texture} />
//     </mesh>
//   )
// }

// function Model({ mouse, ...props }) {
//   const { width, height } = useThree().size
//   const gltf = useLoader(GLTFLoader, diamondUrl)
//   const model = useMemo(() => gltf.scene.children[0].clone(), [])
//   const [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial] = useMemo(() => {
//     const envFbo = new WebGLRenderTarget(width, height)
//     const backfaceFbo = new WebGLRenderTarget(width, height)
//     const backfaceMaterial = new BackfaceMaterial()
//     const refractionMaterial = new RefractionMaterial({ envMap: envFbo.texture, backfaceMap: backfaceFbo.texture, resolution: [width, height] })
//     return [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial]
//   }, [width, height])

//   useFrame(({ gl, scene, camera }) => {
//     model.rotation.y += (mouse.current[0] / (width / 2) - model.rotation.y) * 0.1
//     model.rotation.x += (mouse.current[1] / (height / 2) - model.rotation.x) * 0.1
//     gl.autoClear = false
//     // render env to fbo
//     camera.layers.set(1)
//     gl.setRenderTarget(envFbo)
//     gl.render(scene, camera)
//     // render cube backfaces to fbo
//     camera.layers.set(0)
//     model.material = backfaceMaterial
//     gl.setRenderTarget(backfaceFbo)
//     gl.clearDepth()
//     gl.render(scene, camera)
//     // render env to screen
//     camera.layers.set(1)
//     gl.setRenderTarget(null)
//     gl.render(scene, camera)
//     gl.clearDepth()
//     // render cube with refraction material to screen
//     camera.layers.set(0)
//     model.material = refractionMaterial
//     gl.render(scene, camera)
//   }, 1)

//   return <primitive object={model} {...props} />
// }

// // Remove <Effects /> and the background will show

// function App() {
//   const mouse = useRef([0, 0])
//   return (
//     <Canvas
//       camera={{ fov: 50, position: [0, 0, 5] }}
//       onMouseMove={e => (mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2])}>
//       <Suspense fallback={null}>
//         <Background />
//         <Model mouse={mouse} />
//       </Suspense>
//       <Effects />
//     </Canvas>
//   )
// }

// ReactDOM.render(<App />, document.getElementById("root"))
