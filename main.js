import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5
scene.add(camera);
const canvas = document.getElementsByClassName("threejs")[0];

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

   const axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)   
 

const controls = new OrbitControls(camera, renderer.domElement);

 controls.enableDamping = true;
    const clock =new THREE.Clock()
let previousTime=0
    const animate = function () {
      const currentTime = clock.getElapsedTime();
      const delta=currentTime-previousTime
      previousTime = currentTime 
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix()
        window.requestAnimationFrame(animate);
     mesh.rotation.y+=THREE.MathUtils.degToRad(1)
      controls.update();
      renderer.render(scene, camera); // Render the scene only once
    };

    animate();
  ;
window.addEventListener("resize", () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ...

// Call the animate function inside the window resize event handler
window.addEventListener("resize", () => {
  animate();
});