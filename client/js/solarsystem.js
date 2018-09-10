var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

var paused = false;

var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(0, 10, 0);
light.castShadow = true;
scene.add(light);

var system = [];

var sun = new Planet(0, 6, 0xffff00);
system.push(sun);

var planet = new Planet(12, 3, 0xffffff, 2);
system.push(planet);
sun.addChild(planet);

var planet1 = new Planet(24, 4, 0xffffff, 4);
system.push(planet1);
sun.addChild(planet1);

var planet2 = new Planet(8, 2, 0xffffff, 1);
planet1.addChild(planet2);

camera.position.z = 64;
camera.position.y = 25;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

function animate() {
    requestAnimationFrame(animate);
    for (i = 0; i < system.length; i++) {
        let p = system[i];
        p.mesh.rotation.x += 0.01;
        p.mesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();

function update() {
    setInterval(function() {
        if (paused == false) {
            for (i = 0; i < system.length; i++) {
                sun.updateOrbits();
                if (planet1.mesh.position.x > planet1.pos.x - .3 && planet1.mesh.position.x < planet1.pos.x + .3) {
                    if (planet1.mesh.position.z > planet1.pos.z - .3 && planet1.mesh.position.z < planet1.pos.z + .3) {
                        planet1.orbits++;
                    }
                }
            }
        }
    }, 33);
}

update();
