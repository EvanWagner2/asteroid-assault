// variables 
let player: game.LedSprite = game.createSprite(2,4);
let asteroid: game.LedSprite = null;
let xAcceleration = 0;
let delay = 1000;
let laser: game.LedSprite = null;

// asteroid movement 
basic.forever(function(){
    asteroid = game.createSprite(Math.randomRange(4,0), 0);

// move asteroid 
while(asteroid.get(LedSpriteProperty.Y)<4){
    asteroid.change(LedSpriteProperty.Y, 1);
    basic.pause(delay)
// check for laser collisions 
    if(laser != null && laser.isTouching(asteroid)){
        asteroid.delete();
        laser.delete();
    }
}
// speed up asteroids
delay = delay - delay /10;
if(player.isTouching(asteroid)){
    game.gameOver()
}else{
    asteroid.delete()
    game.addScore(1)
}
})

// player controls
basic.forever(function(){
    xAcceleration = input.acceleration(Dimension.X)

    // move player
    if(xAcceleration < -150 && player.get(LedSpriteProperty.X)>0){
        player.change(LedSpriteProperty.X, -1)
    } else if (xAcceleration > 150 && player.get(LedSpriteProperty.X)<4){
        player.change(LedSpriteProperty.X, 1)
    }
    basic.pause(50);
})

// firing lasers
basic.forever(function(){
input.onButtonPressed(Button.AB, function() {
    laser = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    // move lasers
    while(laser.get(LedSpriteProperty.Y)>= 1){
        laser.change(LedSpriteProperty.Y, -1);
        basic.pause(50);

        if (laser != null && laser.isTouching(asteroid)) {
            asteroid.delete();
            laser.delete();
        }
    }
    laser.delete();
})
})

basic.forever(function() {
    if(game.isGameOver()&& input.buttonIsPressed(Button.A)){
        control.reset()
    }
})