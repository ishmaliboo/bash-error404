
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	
	var audioContext, track, panner
	var drip
	
function preload() {
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64);
	wall = new Sprite("img/DungeonFloor.jpg");


	audioContext = new AudioContext();
	drip = new Audio("sound/water-drops-daniel_simon.wav");
	track = audioContext.createMediaElementSource(drip);
	panner = new PannerNode(audioContext);
	
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

		track.connect(panner).connect(audioContext.destination);
		drip.play();
}


function update() {
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
		game.checkCollision(boy, wall);

		var x = 100 - (boy.getX() / 2);
		var y = 100 - (boy.getY() / 2);
		
		panner.positionX.value = x;
		panner.positionY.value = y;
}
	