
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	
function preload() {
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64);
	wall = new Sprite("img/DungeonFloor.jpg");
	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();

	var direction;
	var velocY;
	var velocX;
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
		velocY = 0;
		velocX = 0;
		if (left.isDown()) {
			direction = 'left';
			velocX += -100;
		}
		
		if (right.isDown()) {
			direction = 'right'
			velocX += 100
		}
		
		if (up.isDown()) {
			direction = 'forward'
			velocY += -100
		}
		
		if (down.isDown()) {
			direction = 'back'
			velocY += 100
		}
		
		if (velocY == 0 && velocX == 0){
			direction = 'still';
		}
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
		game.checkCollision(boy, wall);
	
}
	