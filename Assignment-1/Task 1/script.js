import * as THREE from 'three';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/webxr/VRButton.js';


/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050d1a);


/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1.6, 4);


/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.xr.enabled = true;

document.body.appendChild(renderer.domElement);

document.body.appendChild(
  VRButton.createButton(renderer)
);


/* =========================
   CONTROLS
========================= */

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;


/* =========================
   LIGHTS
========================= */

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.6
);

scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  1
);

directionalLight.position.set(5,5,5);

scene.add(directionalLight);


/* =========================
   OBJECT
========================= */

const geometry = new THREE.TorusKnotGeometry(
  0.7,
  0.25,
  100,
  16
);

const material = new THREE.MeshStandardMaterial({
  color:'#ff0000',
  metalness:0.2,
  roughness:0.5
});

const object = new THREE.Mesh(
  geometry,
  material
);

object.position.y = 1.6;

scene.add(object);


/* =========================
   AXES HELPER
========================= */

const axesHelper = new THREE.AxesHelper(3);

axesHelper.position.y = 1.6;

scene.add(axesHelper);


/* =========================
   GRID
========================= */

const grid = new THREE.GridHelper(20,20);

scene.add(grid);


/* =========================
   ROTATION STATE
========================= */

const rotationState = {
  x:true,
  y:true,
  z:true
};


/* =========================
   BUTTON FUNCTIONS
========================= */

window.toggleRotation = function(axis){

  rotationState[axis] = !rotationState[axis];

  const btn = document.querySelector(`.btn.${axis}`);

  if(rotationState[axis]){

    btn.classList.add('active');
    btn.classList.remove('inactive');

  }else{

    btn.classList.remove('active');
    btn.classList.add('inactive');

  }

};


window.resetRotation = function(){

  object.rotation.set(0,0,0);

};


/* =========================
   ANIMATION LOOP
========================= */

renderer.setAnimationLoop(()=>{

  if(rotationState.x){
    object.rotation.x += 0.01;
  }

  if(rotationState.y){
    object.rotation.y += 0.01;
  }

  if(rotationState.z){
    object.rotation.z += 0.01;
  }

  controls.update();

  renderer.render(scene,camera);

});


/* =========================
   RESIZE
========================= */

window.addEventListener('resize',()=>{

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});