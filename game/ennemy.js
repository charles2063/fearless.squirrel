var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 3;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 2;

    this.material = new THREE.MeshLambertMaterial({
        color: 0xff4500,
        });

    var singleGeometry = new THREE.Geometry();
    //console.log(singleGeometry);

    vehiculeMesh = new THREE.BoxGeometry(30, 30, 30);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};


Ennemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.position.x,
        this.speed * Math.sin(this.direction) + this.position.y,
        this.graphic.position.z
    );

    this.position = moveTo;

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
    
    light1.position.x = this.position.x;
    light1.position.y = this.position.y;
   //light1.position.z = this.graphic.position.z + 500;
};

Ennemy.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Ennemy.prototype.rotate = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), -angle);
};
