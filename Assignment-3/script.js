/* =========================================================
   IMPORTS
========================================================= */

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { FontLoader }
from 'three/addons/loaders/FontLoader.js'; import { TextGeometry }
from 'three/addons/geometries/TextGeometry.js';

/* =========================================================
   SCENE
========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87CEEB);

scene.fog = new THREE.Fog(0x87CEEB,40,120);


/* =========================================================
   CAMERA
========================================================= */

const camera = new THREE.PerspectiveCamera(

    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000

);

camera.position.set(0,10,25);


/* =========================================================
   RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({

    antialias:true

});

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

renderer.xr.enabled = true;

document.body.appendChild(
    VRButton.createButton(renderer)
);

/* =========================================================
   CONTROLS
========================================================= */

const controls = new OrbitControls(

    camera,
    renderer.domElement

);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.maxPolarAngle = Math.PI / 2.1;
/* =========================================================
   WASD MOVEMENT
========================================================= */

const keys = {

    w:false,
    d:false,
    s:false,
    
    a:false,

};

document.addEventListener('keydown',(e)=>{

    if(e.key.toLowerCase() === 'w') keys.w = true;

    if(e.key.toLowerCase() === 'a') keys.a = true;

    if(e.key.toLowerCase() === 's') keys.s = true;

    if(e.key.toLowerCase() === 'd') keys.d = true;

});


document.addEventListener('keyup',(e)=>{

    if(e.key.toLowerCase() === 'w') keys.w = false;

    if(e.key.toLowerCase() === 'a') keys.a = false;

    if(e.key.toLowerCase() === 's') keys.s = false;

    if(e.key.toLowerCase() === 'd') keys.d = false;

});

/* =========================================================
   LIGHTS
========================================================= */

const ambientLight = new THREE.AmbientLight(

    0xffffff,
    1.2

);

scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(

    0xffffff,
    2

);

directionalLight.position.set(10,20,10);

directionalLight.castShadow = true;

scene.add(directionalLight);


/* =========================================================
   3D TITLE TEXT
========================================================= */

const fontLoader = new FontLoader();

fontLoader.load(

    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',

    function(font){

        const textGeometry = new TextGeometry(

            'Flipping Quote Pallets',

            {

                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 5

            }

        );

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial({

            color: "#00ff00",
            metalness: 0.8,
            roughness: 0.2

        });

        const textMesh = new THREE.Mesh(

            textGeometry,
            textMaterial

        );

        textMesh.position.set(0,10,10);


        scene.add(textMesh);

    }

);



/* =========================================================
   GLTF LOADER
========================================================= */

const loader = new GLTFLoader();


/* =========================================================
   GROUND
========================================================= */

const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(200,200),

    new THREE.MeshStandardMaterial({

        color:0x4c9a2a

    })

);

ground.rotation.x = -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   FULL GRASS FIELD
========================================================= */

function addGrass(x,z,scale=1){

    loader.load('./models/Grass Patch.glb',(gltf)=>{

        const grass = gltf.scene;

        grass.position.set(x,0,z);

        grass.scale.set(scale,scale,scale);

        scene.add(grass);

    });

}


/* =========================================================
   GENERATE LARGE GRASS AREA
========================================================= */

for(let x = -90; x <= 90; x += 8){

    for(let z = -90; z <= 0; z += 8){

        addGrass(

            x + Math.random()*2,
            z + Math.random()*2,
            0.8

        );

    }

}


/* =========================================================
   TREES
========================================================= */

function addTree(x,z,scale=2){

    loader.load('./models/Tree.glb',(gltf)=>{

        const tree = gltf.scene;

        tree.position.set(x,0,z);

        tree.scale.set(scale,scale,scale);

        scene.add(tree);

    });

}

addTree(-20,-20,2);
addTree(-10,-35,3);
addTree(15,-30,2.5);
addTree(35,-45,4);
addTree(30,-40,3,30);
addTree(-35,-40,3);

/* =========================================================
   LARGE ROCKS
========================================================= */

function addLargeRock(x,y,z,scale=4){

    loader.load('./models/Rock Large.glb',(gltf)=>{

        const rock = gltf.scene;

        rock.position.set(x,y,z);

        rock.scale.set(scale,scale,scale);

        scene.add(rock);

    });

}

addLargeRock(-20,0,-50,4);
addLargeRock(20,0,-60,5);


/* =========================================================
   ROCKS
========================================================= */

function addRock(x,z,scale=2){

    loader.load('./models/Rock.glb',(gltf)=>{

        const rock = gltf.scene;

        rock.position.set(x,0,z);

        rock.scale.set(scale,scale,scale);

        scene.add(rock);

    });

}

addRock(-8,-35,10);
addRock(-9,-35,8);
addRock(10,-20,2.5);
addRock(25,-35,2);





/* =========================================================
   FLOWERS
========================================================= */

function addFlower(x,y,z,scale=1){

    loader.load('./models/Tulip 3.glb',(gltf)=>{

        const flower = gltf.scene;

        flower.position.set(x,y,z);

        flower.scale.set(scale,scale,scale);

        scene.add(flower);

    });

}

addFlower(-8,0.7,-33,1);
addGrass(-8,-33,1);
addFlower(3,0.7,-12,1);
addFlower(8,0.7,-18,1);
addFlower(-10, 0.7,-22,1);

/* =========================================================
   BUTTERFLIES
========================================================= */

const butterflies = [];

function addButterfly(x,y,z){

    loader.load('./models/Butterfly.glb',(gltf)=>{

        const butterfly = gltf.scene;

        butterfly.position.set(x,y,z);

        butterfly.scale.set(0.02 ,0.02,0.02);

        scene.add(butterfly);

        butterflies.push(butterfly);

    });

}

addButterfly(-8,0.7,-33);
addButterfly(3,1,-12);
addButterfly(8,1,-18);
/* =========================================================
   CLOUDS
========================================================= */

const clouds = [];

function addCloud(x,y,z,scale=10){

    loader.load('./models/Cumulus Clouds 2.glb',(gltf)=>{

        const cloud = gltf.scene;

        cloud.position.set(x,y,z);

        cloud.scale.set(scale,scale,scale);

        scene.add(cloud);

        clouds.push(cloud);

    });

}

addCloud(-20,25,-40,8);
addCloud(10,20,-60,10);
addCloud(35,30,-80,12);

addCloud(-20,25,-40,8);
addCloud(10,20,-60,10);
addCloud(35,30,-80,12);

addCloud(0,10,10,3);




/* =========================================================
   QUOTE DATA
========================================================= */

const quotes = [

    {
        quote:"Dream big and dare to fail.",
        author:"Norman Vaughan"
    },

    {
        quote:"Stay hungry, stay foolish.",
        author:"Steve Jobs"
    },

    {
        quote:"Everything you can imagine is real.",
        author:"Pablo Picasso"
    },

    {
        quote:"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
        author:"Lord Krishna"
    },

    {
        author:"Theodore Roosevelt",
        quote:"Believe you can and you're halfway there."
        
    }

];

const cards = [];


/* =========================================================
   CREATE CARD
========================================================= */

function createCard(data,x,z){

    const group = new THREE.Group();

    group.position.set(x,8,z);

    scene.add(group);


    /* FRONT CANVAS */

    const frontCanvas = document.createElement('canvas');

    frontCanvas.width = 512;
    frontCanvas.height = 512;

    const frontCtx = frontCanvas.getContext('2d');

    frontCtx.fillStyle = '#ffffff';
    frontCtx.fillRect(0,0,512,512);

    frontCtx.fillStyle = '#000000';
    frontCtx.font = '32px Arial';
    frontCtx.textAlign = 'center';

    wrapText(

        frontCtx,
        data.quote,
        256,
        230,
        380,
        40

    );

    const frontTexture =
        new THREE.CanvasTexture(frontCanvas);


    /* BACK CANVAS */

    const backCanvas = document.createElement('canvas');

    backCanvas.width = 512;
    backCanvas.height = 512;

    const backCtx = backCanvas.getContext('2d');

    backCtx.fillStyle = '#ffe0b2';
    backCtx.fillRect(0,0,512,512);

    backCtx.fillStyle = '#000000';

backCtx.font = 'bold 34px Arial';

backCtx.textAlign = 'center';

wrapText(

    backCtx,
    data.author,
    256,
    180,
    360,
    50

);

    const backTexture =
        new THREE.CanvasTexture(backCanvas);


    /* MATERIALS */

    const materials = [

        new THREE.MeshBasicMaterial({color:0xffffff}),
        new THREE.MeshBasicMaterial({color:0xffffff}),
        new THREE.MeshBasicMaterial({color:0xffffff}),
        new THREE.MeshBasicMaterial({color:0xffffff}),

        new THREE.MeshBasicMaterial({
            map:frontTexture
        }),

        new THREE.MeshBasicMaterial({
            map:backTexture
        })

    ];


    /* CARD */

    const card = new THREE.Mesh(

        new THREE.BoxGeometry(5,7,0.2),
        materials

    );

    card.castShadow = true;

    group.add(card);

    group.userData = {

        flipped:false

    };

    cards.push(group);

}


/* =========================================================
   CREATE 5 CARDS
========================================================= */

createCard(quotes[0],-20,-20);
createCard(quotes[1],0,-25);
createCard(quotes[2],20,-20);
createCard(quotes[3],-10,-10);
createCard(quotes[4],15,-10);


/* =========================================================
   TEXT WRAP
========================================================= */

function wrapText(ctx,text,x,y,maxWidth,lineHeight){

    const words = text.split(' ');

    let line = '';

    for(let n=0;n<words.length;n++){

        const testLine = line + words[n] + ' ';

        const metrics = ctx.measureText(testLine);

        const testWidth = metrics.width;

        if(testWidth > maxWidth && n > 0){

            ctx.fillText(line,x,y);

            line = words[n] + ' ';

            y += lineHeight;

        }else{

            line = testLine;

        }

    }

    ctx.fillText(line,x,y);

}


/* =========================================================
   CLICK DETECTION
========================================================= */

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();


window.addEventListener('click',(event)=>{

    mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);

    const intersects =
        raycaster.intersectObjects(scene.children,true);

    intersects.forEach((hit)=>{

        cards.forEach((card)=>{

            if(card.children.includes(hit.object)){

                card.userData.flipped =
                    !card.userData.flipped;

            }

        });

    });

});


/* =========================================================
   ANIMATION LOOP
========================================================= */

function animate(){

    requestAnimationFrame(animate);


    /* CARD FLIP */

    cards.forEach((card)=>{

        const targetRotation =
            card.userData.flipped
            ? Math.PI
            : 0;

        card.rotation.y +=
            (targetRotation - card.rotation.y) * 0.08;

    });




   /* =========================================================
   REALISTIC BUTTERFLY MOVEMENT
========================================================= */

butterflies.forEach((b,i)=>{

    const time = Date.now() * 0.001;

    /* FLOATING MOTION */

    b.position.y +=
        Math.sin(time * 2 + i) * 0.01;

    /* FORWARD FLYING */

    b.position.x +=
        Math.sin(time + i) * 0.01;

    b.position.z +=
        Math.cos(time + i) * 0.01;

    /* WING-LIKE ROTATION */

    b.rotation.y =
        Math.sin(time * 3 + i) * 0.5;

    b.rotation.z =
        Math.sin(time * 10 + i) * 0.2;

});

    /* =========================================================
   CLOUD MOVEMENT
========================================================= */

clouds.forEach((cloud,index)=>{

    cloud.position.x += 0.01 + index * 0.002;

    if(cloud.position.x > 80){

        cloud.position.x = -80;

    }

});


/* =========================================================
   CAMERA MOVEMENT
========================================================= */

const speed = 0.1;

const forward = new THREE.Vector3();

camera.getWorldDirection(forward);

forward.y = 0;

forward.normalize();


const right = new THREE.Vector3();

right.crossVectors(

    forward,
    new THREE.Vector3(0,1,0)

);


if(keys.w){

    camera.position.addScaledVector(
        forward,
        speed
    );

    controls.target.addScaledVector(
        forward,
        speed
    );

}


if(keys.s){

    camera.position.addScaledVector(
        forward,
        -speed
    );

    controls.target.addScaledVector(
        forward,
        -speed
    );

}


if(keys.a){

    camera.position.addScaledVector(
        right,
       -speed
    );

    controls.target.addScaledVector(
        right,
        -speed
    );

}


if(keys.d){

    camera.position.addScaledVector(
        right,
        speed
    );

    controls.target.addScaledVector(
        right,
        speed
    );

}

    controls.update();

    renderer.render(scene,camera);

}


animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener('resize',()=>{

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,
        window.innerHeight

    );

});