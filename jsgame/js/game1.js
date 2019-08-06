
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	var direction;
	var velocY;
	var velocX;
	
	
function preload() {
	player = new Sprite("img/boy.png", 64, 64);
	floor = new Sprite("img/floor.png");

	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
}

function create() {
		boy = player.create(100, 100);
		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);
}


function update() {
		direction = 'still';
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
		
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
	
}
	