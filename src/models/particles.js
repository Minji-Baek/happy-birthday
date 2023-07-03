import * as THREE from 'three';
export default class Particles {
  constructor () {
    const count = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
  
    for(let i = 0; i < count; i++){
      positions[i * 3] =  THREE.MathUtils.randFloatSpread(10);//Math.random() - 0.5;// x
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10); //Math.random() - 0.5;// y
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10); //Math.random() - 0.5;// z
  
      colors[i * 3] =  (Math.random() * 0.2) + 0.5; // r 
      colors[i * 3 + 1] = Math.random() * 0.01 ; // g
      colors[i * 3 + 2] = (Math.random() * 0.5) + 0.3; // b
  
    }
  
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./assets/textures/particle.png');
    const material = new THREE.PointsMaterial({
      size: 0.1,
      alphaMap: texture,
      transparent: true,
      depthWrite: false,
    });
    material.alphaMap = texture;
    material.transparent = true;
    material.depthWrite = false; //깊이 정보를 저장하여 그리는 것. 끄면 같은 계층에서 그려짐
  
    const points = new THREE.Points(geometry, material);
    this.points = points;
  }
}