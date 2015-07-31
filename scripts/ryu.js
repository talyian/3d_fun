function Ryu(scene) {
    this.scene = scene;
    this.numCells = 7;
    this.pos = 0;

    var image = "img/characters/ryu1.png";

    var spriteManager = new BABYLON.SpriteManager("characterManager", image, 1, 114, scene, 0.0);

    this.spriteManager = spriteManager;

    var ryu = new BABYLON.Sprite("ryu", spriteManager);
    ryu.position.y = 2.5;
    ryu.position.x = 1;
    ryu.position.z = -50;
    ryu.size = 5;

    this.ryu = ryu;

}

Ryu.prototype.update = function(){

  var drange = 360 * (1/this.numCells);

  var source = this.scene.activeCamera.position;
  var target = this.ryu.position;
  var control = {x:0,z:0};

  var angle = calculateAngle(source,target,control);

  var cell = Math.floor((angle/drange)%this.numCells);

  if (cell != this.pos){
    this.ryu.playAnimation(this.pos,cell,false,100);
    this.pos = cell;
  }

}

function calculateAngle(source,target,control) {

  var a = distance(source,control);
  var b = distance(target,control);
  var c = distance(source,target);

  var A = Math.acos(((b*b)+(c*c)-(a*a))/(2*b*c));

  return toDegrees(A);

}

function distance(p1,p2){
  var dx = p2.x-p1.x;
  var dz = p2.z-p1.z;
  return Math.sqrt(dx*dx + dz*dz);
}

function toDegrees(angle){
  return angle * (180/Math.PI);
}
