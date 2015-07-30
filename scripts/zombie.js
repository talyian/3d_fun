

function Zombie(scene) {
    this.scene = scene;
    this.createZombie(scene);
    this.nextPos = null;
    this.sleepUntil = 0;
    this.speed = 2;
    this.isMoving = false;
};

Zombie.prototype.createZombie = function(scene) {
    var zombie = new BABYLON.Mesh.CreatePlane("zombie", 5.0, scene);
    zombie.material = new BABYLON.StandardMaterial("zombie_mat", scene);
    zombie.material.emissiveTexture = new BABYLON.Texture("textures/zombie.png", scene);
    zombie.material.emissiveTexture.hasAlpha = true;
    zombie.material.diffuseTexture = new BABYLON.Texture("textures/zombie.png", scene);
    zombie.material.diffuseTexture.hasAlpha = true;
    zombie.material.backFaceCulling = false;
    zombie.position.z = 0;
    zombie.position.x = 5;
    zombie.position.y = 2.5;
    this.zmesh = zombie;
};

Zombie.prototype.doMovement = function() {
    var movedRatio = (new Date().getTime() - this.startTime) / (this.endTime - this.startTime); 
    if (movedRatio < 1) {
        this.isMoving = true;
        var newPos = new BABYLON.Vector3.Lerp(this.originalPos, this.nextPos, movedRatio);
        this.zmesh.position = newPos;
    }
    else {
        this.isMoving = false;
    }
}

Zombie.prototype.setDestination = function(nextPos) {
    this.nextPos = nextPos;
    this.originalPos = new BABYLON.Vector3;
    this.originalPos = this.zmesh.position;
    var dist = BABYLON.Vector3.Distance(this.zmesh.position, this.nextPos);
    this.timeToNextPos = dist / this.speed * 100;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + this.timeToNextPos;
}

Zombie.prototype.update = function() {
    // Always look at the camera
    this.zmesh.lookAt(this.scene.activeCamera.position);

    // Set a new destination and then sleep a random amount of time
    if (!this.isMoving) {
        if (new Date().getTime() > this.sleepUntil) {
            var nextPos = new BABYLON.Vector3(Math.random()*50-25, 2.5, Math.random()*50-25);
            this.setDestination(nextPos);
            this.sleepUntil = new Date().getTime() + Math.random()*5000;
        }
    }
    this.doMovement();
}
