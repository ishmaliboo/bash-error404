
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	
	
function preload() {
	
	floor = new Sprite("img/floor.png");
	
	player = new Sprite("img/boy.png", 64, 64);
	// this.load.image('floor', 'img/floor.png');
	wall = new Sprite("img/DungeonFloor.jpg");
	

	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
}

function create() {
	
		
		floor = floor.create(0, 0, 1000, 1000);
		
		wall1 = wall.create(10, 100, 10, 100);
		wall.setImmovable(true);
		
		boy = player.create(100, 100);
		
		
		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);
		
		
}


function update() {
	
			
		if (left.isDown()) {
			boy.playAnimation('left');
			boy.setVelocityX(-100);
		}
		
		else if (right.isDown()) {
			boy.playAnimation('right');
			boy.setVelocityX(100);
		}
		
		else if (up.isDown()) {
			boy.playAnimation('forward');
			boy.setVelocityY(-100);
		}
		
		else if (down.isDown()) {
			boy.playAnimation('back');
			boy.setVelocityY(100);
		}
		
		else {
			boy.playAnimation('still')
			boy.setVelocityX(0);
			boy.setVelocityY(0);
		}
		
		game.checkCollision(boy, wall);
	
}
	