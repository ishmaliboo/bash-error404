    var config = {
        type: Phaser.AUTO,
        width: 1000,
        height: 1000,
        // physics: {
            // default: 'arcade',
            // arcade: {
                // gravity: { y: 200 }
            // }
        // },
        scene: {
            preload: preload,
            create: create,
			update: update
        }
    };

    var game = new Phaser.Game(config);
	var player;
	var cursers;
	

    function preload ()
    {
		

		
		cursors = this.input.keyboard.createCursorKeys();

		this.load.image('background', 'img/floor.png');
		
		this.load.spritesheet('boy', 
			'img/boy.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    }

    function create ()
    {
		
		this.add.image(500, 500, 'background');
		// boy = player.create(100, 100);
		// boy.addAnimation('back', [0, 1, 2, 3], 10);
		// boy.addAnimation('left', [4, 5, 6, 7], 10);
		// boy.addAnimation('right', [8, 9, 10, 11], 10);
		// boy.addAnimation('forward', [12, 13, 14, 15], 10);
		
		this.player = this.add.sprite(100, 450, 'boy');
		
		
		
		
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'back',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10
		});
		this.anims.create({
			key: 'forward',
			frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
			frameRate: 10
		});
		


		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1
		});		
    }
	
	function update()
	{
		
		// if (left.isDown()) {
			// boy.playAnimation('left');
			// boy.setVelocityX(-100);
		// }
		
		// if (right.isDown()) {
			// boy.playAnimation('right');
			// boy.setVlocityX(100);
		// }
		
		// if (up.isDown()) {
			// boy.playAnimation('forward');
			// boy.setVelocityY(-100);
		// }
		
		// if (down.isDown()) {
			// boy.playAnimation('back');
			// boy.setVelocityY(100);
		// }		
		
		if (cursors.left.isDown)
		{
			player.setVelocityX(-160);

			player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
			player.setVelocityX(160);

			player.anims.play('right', true);
		}
		
		else if (cursors.up.isDown)
		{
			player.setVelocityY(-160);
			
			player.anims.play('forward');
		}	
		
		else if (cursors.down.isDown)
		{
			player.physics.setVelocityY(160);
			
			player.anims.play('back');
			
		}
		
		
		// else
		// {
			// player.setVelocityX(0);

			// player.anims.play('still');
		// }

		
		
	}