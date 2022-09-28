var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    ennemy_collision();
    player_falling();
    player_ennemy_collision();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( x < 0 )
        player1.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;
}

function ennemy_collision()
{
    var x1 = ennemy.graphic.position.x + WIDTH / 2;
    var y1 = ennemy.graphic.position.y + HEIGHT / 2;
    
    rotate = Math.PI / 2 * 2;
    console.log(rotate);
    if ( x1 > WIDTH ) {
        ennemy.graphic.position.x -= x1 - WIDTH;
        ennemy.rotate(rotate);
    }
    if ( x1 < 0 ) {
        ennemy.graphic.position.x -= x1;
        ennemy.rotate(180);
    }
    if ( y1 < 0 )
        ennemy.graphic.position.y -= y1;
    if ( y1 > HEIGHT )
        ennemy.graphic.position.y -= y1 - HEIGHT;
}

function player_ennemy_collision()
{
    x_e = ennemy.graphic.position.x;
    y_e = ennemy.graphic.position.y;
    x_p = player1.graphic.position.x;
    y_p = player1.graphic.position.y;
    test1 = x_e - x_p;
    test2 = y_e - y_p;
    if (test1 < 1 && test2 < 1)
    {
        player1.loseLife();
    }
}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    // lose life when you fall
    //player1.loseLife();

    for (var i = 0; i < length; i++) {
        continue;
        element = noGround[i];

        var tileX = (element[0]) | 0;
        var tileY = (element[1]) | 0;
        var mtileX = (element[0] + sizeOfTileX) | 0;
        var mtileY = (element[1] + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
           player1.dead();
        }
    }

}
