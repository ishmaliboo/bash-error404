
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
<<<<<<< HEAD
	
	
function preload() {
	
	floor = new Sprite("img/floor.png");
	
	player = new Sprite("img/boy.png", 64, 64);
	// this.load.image('floor', 'img/floor.png');
	wall = new Sprite("img/DungeonFloor.jpg");
	

	
=======
	var direction;
	var velocY;
	var velocX;
	
	
function preload() {
	player = new Sprite("img/boy.png", 64, 64);
	floor = new Sprite("img/floor.png");

>>>>>>> e34f8063ef90ca9cb2c29a2fcb3ca7cbdb2c2380
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
}

function create() {
<<<<<<< HEAD
	
		
		floor = floor.create(0, 0, 1000, 1000);
		
		wall1 = wall.create(10, 100, 10, 100);
		wall.setImmovable(true);
		
		boy = player.create(100, 100);
		
		
=======
		boy = player.create(100, 100);
>>>>>>> e34f8063ef90ca9cb2c29a2fcb3ca7cbdb2c2380
		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);
<<<<<<< HEAD
		
		
=======
>>>>>>> e34f8063ef90ca9cb2c29a2fcb3ca7cbdb2c2380
}


function update() {
<<<<<<< HEAD
	
			
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
=======
		direction = 'still';
		velocY = 0;
		velocX = 0;
		if (left.isDown()) {
			direction = 'left';
			velocX = -100;
		}
		
		else if (right.isDown()) {
			direction = 'right'
			velocX = 100
		}
		
		if (up.isDown()) {
			direction = 'forward'
			velocY = -100
		}
		
		else if (down.isDown()) {
			direction = 'back'
			velocY = 100
		}
		
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
>>>>>>> e34f8063ef90ca9cb2c29a2fcb3ca7cbdb2c2380
	
}
	