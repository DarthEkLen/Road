//variables
const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe1e1e1);
let selectedObject = [];
let i=0;

//Lights    
const light = [];
light[0]  = new THREE.DirectionalLight(0xffffff, 2);
light[1] = new THREE.DirectionalLight(0xffffff, 2);
light[0].position.set(-4,4,-4);
light[1].position.set(4,4,4);
scene.add(light[0]);
scene.add(light[1]);

//Model
const canvas1 = document.querySelector('.webgl');
function first(){
loader.load('Road-1.gltf', function(gltf){
    const root = gltf.scene;
    root.scale.set(0.1,0.1,0.1);
    scene.add(root);
})
}
console.log(scene);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(1,0.8,1.4);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

//Grid
const helper = new THREE.GridHelper( 10, 50, 'White', 'White');
helper.position.y = 0;
helper.material.opacity = 0.25;
helper.material.transparent = false;
scene.add(helper);

//Raycaster
const raycaster = new THREE.Raycaster();
document.addEventListener("click",click);
function click(event){
    event.preventDefault();
    const mouse2D = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse2D, camera);
    const intersects = raycaster.intersectObjects(scene.children[4].children);
    if(intersects.length>0){
        if(event.ctrlKey){
            intersects[0].object.material = scene.children[4].getObjectByName('ROADM').material;
        }
        else{                                                //Colors => YELLOW/GREEN/RED/ROADM
            switch(i){
                case 0:
                    intersects[0].object.material = scene.children[4].getObjectByName('YELLOW').material;
                    console.log(intersects[0].object.name);
                    break;
                case 1:
                    intersects[0].object.material = scene.children[4].getObjectByName('GREEN').material;
                    console.log(intersects[0].object.name);
                    break;
                case 2:
                    intersects[0].object.material = scene.children[4].getObjectByName('RED').material;
                    console.log(intersects[0].object.name);
            }      
        }
    }
}

//Window Resize
window.addEventListener("resize", function()
{
    var width = window.innerWidth;
    var height = this.window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
})

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas : canvas1
});

//Orbital Controls
const controls =  new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);

document.body.appendChild (renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Animate
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function vi(){
    if(i<2){
        i++;
        switch(i){
            case 1:
                document.getElementById("btn").style.backgroundColor = "lightgreen";
                break;
            case 2:
                document.getElementById("btn").style.backgroundColor = "lightcoral";
                break;
        }
    }
    else{
        i=0;
        document.getElementById("btn").style.backgroundColor = "yellow";
    }
}

first();
animate();