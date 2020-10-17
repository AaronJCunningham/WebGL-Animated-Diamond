import { ShaderMaterial, BackSide } from "three"

export default class RefractionMaterial extends ShaderMaterial {
  constructor(options) {
    super({
      vertexShader: `varying vec3 worldNormal;
      void main() {
        worldNormal = normalize( modelViewMatrix * vec4(normal, 0.)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `varying vec3 worldNormal;
      void main() {
        gl_FragColor = vec4(worldNormal, 1.0);
      }`,
      side: BackSide
    })
  }
}
