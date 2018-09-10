class SolarObject {
    constructor(dist = 0) {
        this.dist = dist;
    }
}

class Planet extends SolarObject {
    constructor(dist, radius, color, speed = 1) {
        super(dist)
        this.radius = radius;
        this.speed = speed;
        this.children = [];
        this.counter = 0;
        this.pos = new THREE.Vector3();
        this.orbits = 0;

        /* Creates Geometry, Material, and Mesh */
        let geo = new THREE.SphereGeometry(radius);
        let mat = new THREE.MeshBasicMaterial({ color: color });
        mat.wireframe = true;
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.recieveShadow = true;
        scene.add(this.mesh);
    }

    // Spins the childs planets and those childs planets around respective origin position
    updateOrbits() {
        if (this.children.length < 1)
            return;
        for (i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            let angle = this.counter++ / (10 * (1 + child.speed));
            child.mesh.position.setX(this.mesh.position.x + Math.sin(angle) * child.dist);
            child.mesh.position.setZ(this.mesh.position.z + Math.cos(angle) * child.dist);
            child.updateOrbits();
        }
    }

    // Sets the initial position.
    updateOrbit(planet) {
        let angle = this.counter++ / (10 * (1 + this.speed));
        this.mesh.position.setX(planet.mesh.position.x + Math.sin(angle) * this.dist);
        this.mesh.position.setZ(planet.mesh.position.z + Math.cos(angle) * this.dist);
        this.pos.copy(this.mesh.position);
    }

    addChild(planet) {
        this.children.push(planet);
        planet.updateOrbit(this);
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }
}