/**
* Sprite class which is at the core of the project
* It is a class that is used to create all of the elements on the screen
* apart from the background which is handled by the game object.
*
* The Sprite Class creates and stores ChildObjects which are the actual
* object that is created on screen. Each function here invokes a function on the
* child object, this allows the manipulation of multiple objects with just one
* function call.
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*
* @param {String} image String reference of an image to use
* @param {number} spriteWidth The width of one frame of the sprite
* @param {number} spriteHeight The height of one frame of the sprite
* @param {String} name The name to give the object, by default it is Sprite plus the number so far created
*/
function Sprite(image, spriteWidth, spriteHeight, name){

	/** @member {Phaser.Game} */
	this.game;
	/** @member {Game} */
	this.parentGame;
	/** @member {Phaser.Group} */
	this.group;
	/** @member {String} */
	this.name;
	/** Load the image */
	this.body;
	/** @member {Array} */
	this.children;
	/** @member {Array} */
	this.animations;

	/**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
	*
	* @private
	*/
	this.constructor = function() {

		// Set up a counter to give unique names to each object
		if (typeof Sprite.counter == 'undefined') {
			Sprite.counter = 1;
		} else {
			Sprite.counter++;
		}

		// Store a reference to our custom game object
		this.parentGame = Game.GET_INSTANCE();
		// Set game to game.world which is the Phaser.Game
		this.game = this.parentGame.world;
		// Create a group to store the child object, this is used
		// internally to decide the group z position
		this.group = this.game.add.group(null, '', true, false, 0);

		// Set up a default name if one is not given
		this.name = name || "Sprite" + Sprite.counter;

		this.spriteWidth = spriteWidth || 0;
		this.spriteHeight = spriteHeight || 0;

		// Load the spritesheet used into memory.
		this.body = this.game.load.spritesheet(this.name, image, this.spriteWidth, this.spriteHeight);

		// Set up arrays to store the children and their animations
		this.children = [];
		this.animations = [];

		// Create the reusables
		this.createReusables();

	}

	/**
	* Create the reusable objects for use, called automatically
	* Theses are common settings that are always used and do
	* not matter too much.
	*
	* Used Internally.
	* @private
	*/
	this.createReusables = function() {
		this.group.enableBody = true;
		this.group.physicsBodyType = Phaser.Physics.ARCADE;
		this.group.setAll('anchor.x', 0.5);
		this.group.setAll('anchor.y', 0.5);
		this.group.setAll('outOfBoundsKill', true);
		this.group.setAll('checkWorldBounds', true);
	}

	/**
	* Create your object at the given x and y coordinates
	* Width and height is used from the image if not specified
	*
	* @param {number} x The x coordinate of the object
	* @param {number} y The y coordinate of the object
	* @param {number|string} width The width of the object
	* @param {number|string} height The height of the object
	*
	* @return {GroupChild} The created GroupChild Object
	*/
	this.create = function(x, y, width, height) {

		// Default to 0
		width = width || 0;
		height = height || 0;

		if(width == 0 || height == 0) {

			// Get the image from cache so we can get its dimensions
			var image = this.game.cache.getImage(this.name);
			width = image.width;
			height = image.height;

			// Custom functions to ensure values are okay
			width = this.parseWidth(width);
			height = this.parseHeight(height);
			x = this.parseX(x, width);
			y = this.parseY(y, height);

			// Create our new child
			var child = this.group.create(x, y, this.name);
			this.children.push(new GroupChild(child));
			// Get its index
			var index = this.children.length - 1;

			// Return the child incase the user wants to store it in a var
			return this.children[index];

		} else {
			// Create
			return this.createWidthHeight(x, y, width, height);

		}

	}
	/**
	* Create your object at the given x and y coordinates and with
	* a given width and height.
	*
	* @param {number} x The x coordinate of the object
	* @param {number} y The y coordinate of the object
	* @param {number|string} width The width of the object
	* @param {number|string} height The height of the object
	*
	* @return {GroupChild} The created child
	*/
	this.createWidthHeight = function(x, y, width, height) {

		width = this.parseWidth(width);
		height = this.parseHeight(height);

		y = this.parseY(y, height);
		x = this.parseX(x, width);

		var obj = this.create(x, y);
		obj.setWidth(width);
		obj.setHeight(height);

		return obj;
	}

	/**
	* Add an animation to all sprites
	*
	* @param {String} name The name of an animation, required for referencing later.
	* @param {number[]} frames An array of the frames that the animation plays
	* @param {number} fps The frame rate of the animation, a higher value plays the animation faster
	*/
	this.addAnimation = function(name, frames, fps) {

		// Ensure an animation with this name has not already been set
		if(this.animations.indexOf(name) != -1) {
			throw new Error("An animation with the name  \"" + name + "\ has already been set!");
		}

		// Ensure the sprite width and height was provided
		if(this.spriteWidth == 0 || this.spriteHeight == 0) {
			throw new Error("You must provide a sprite width and height before creating an animation!");
		}

		var totalFrames = this.getTotalFrames();

		// Loop through to ensure all frames are valid
		for(var i = 0; i < frames.length; i++) {

			if(frames[i] >= totalFrames  || frames[i] < 0) {
				throw new Error("You have specified a frame outside of the valid range! (" + frames[i] + ") "
								+ "The highest frame you can have is " + (totalFrames - 1) + ".");
			}
		}

		// Add the name to the array so it cannot be used again
		this.animations.push(name);

		// Go through each enemy in the array and add an animation to it
		for(var i = 0; i < this.children.length; i++)
			this.children[i].addAnimation(name, frames, fps);

	}

	/**
	* Plays a predefined animation on all of the children
	* This animation must have been created with addAnimation beforehand
	*
	* @param {String} name The name of the animation to play,
	*/
	this.playAnimation = function(name) {

		// Ensure an animation with this name has been set
		if(this.animations.indexOf(name) == -1) {
			throw new Error("An animation with the name  \"" + name + "\ has not yet been set!");
		}

		// Go through each enemy in the array and play an animation on it
		for(var i = 0; i < this.children.length; i++)
			this.children[i].playAnimation(name);

	}

	/**
	* Set the y velocity of all of the children
	*
	* @param {number} y The y velocity to give the children
	*/
	this.setVelocityY = function(y) {
		// Set the velocity on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setVelocityY(y);
	}

	/**
	* Set the x velocity of all of the children
	*
	* @param {number} x The x velocity to give the children
	*/
	this.setVelocityX = function(x) {
		// Set the velocity on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setVelocityX(x);
	}

	/**
	* Set the y position of all of the children
	* WARNING: This can sometime mess up the collision detection
	* so it is usually best to use @see setVelocityY
	*
	* @param {number} y The y position to give the children
	*/
	this.setY = function(y) {
		// Set the velocity on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setY(y);
	}

	/**
	* Set the x position of the child
	* WARNING: This can sometime mess up the collision detection
	* so it is usually best to use @see setVelocityX
	*
	* @param {number} x The x position to give the children
	*/
	this.setX = function(x) {
		// Set the x position on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setX(x);
	}

	/**
	* Stops the animation that is currently being played
	* and shows the stop frame for all of the children.
	*/
	this.stop = function() {
		// Stop animation on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].stop();
	}

	/**
	* Sets the stop frame for the children, this is the frame that is
	* shown when the children are stopped.
	*
	* @param {number} frame The number of the frame to be set as the stop frame
	*/
	this.setStopFrame = function(frame) {

		// Ensure the sprite width and height was provided
		if(this.spriteWidth == 0 || this.spriteHeight == 0) {
			throw new Error("You must provide a sprite width and height before setting a stop frame!");
		}

		var totalFrames = this.getTotalFrames();

		if(frame >= totalFrames || frame < 0) {
			throw new Error("Your stop frame must be within the range of the available frames! "
							+ "(0-" + (totalFrames - 1) + ")");
		}

		// Set the stop frame on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setStopFrame(frame);
	}

	/**
	* Return a value of x, useful if specified as a string (percentage)
	* Requires the width of the object to work out
	*
	* @param {number} x The x value
	* @param {number} width The width of the object
	* @return {number} x
	* @private
	*/
	this.parseX = function(x, width) {

		if((typeof x === "string") || (x < 0)) {

			var newX = parseInt(x);

			if(!(newX > -1)) {
				console.log("Your value for x: " + x + " is not a valid number!");
				x = 0;
			}
			else {

				var div = newX/100;

				x = this.parentGame.gameWidth() * div;

				var minWidth = this.parentGame.gameWidth() - width;

				if(minWidth < x)
					x = minWidth;

			}

		}

		return x;

	}

	/**
	* Return a value of y, useful if specified as a string (percentage)
	* Requires the height of the object to work out
	*
	* @param {number} y The y value
	* @param {number} height The height of the object
	* @return {number} y
	* @private
	*/
	this.parseY = function(y, height) {

		if((typeof y === "string") || (y < 0)) {

			var newY = parseInt(y);

			if(!(newY > -1)) {
				console.log("Your value for y: " + y + " is not a valid number!");
				y = 0;
			}
			else {

				var div = newY/100;

				y = this.parentGame.gameHeight() * div;

				var minHeight = this.parentGame.gameHeight() - height;

				if(minHeight < y)
					y = minHeight;

			}

		}

			return y;

	}

	/**
	* Return a value of the width, useful if specified as a string (percentage)
	*
	* @param {number} width The width value
	* @return {number} width
	* @private
	*/
	this.parseWidth = function(width) {

		if((typeof width === "string") || (width < 0)) {

			var newWidth = parseInt(width);

			if(!(newWidth > -1)) {
				console.log("Your value for width for: " + width + " is not a valid number!");
				width = 0;
			}
			else {

				var div = newWidth/100;

				width = this.parentGame.gameWidth() * div;

			}

		}

		return width;

	}

	/**
	* Return a value of the height, useful if specified as a string (percentage)
	*
	* @param {number} height The height value
	* @return {number} height
	* @private
	*/
	this.parseHeight = function(height) {

		if((typeof height === "string") || (height < 0)) {

			var newHeight = parseInt(height);

			if(!(newHeight > -1)) {
				console.log("Your value for height: " + height + " is not a valid number!");
				height = 0;
			}
			else {

				var div = newHeight/100;

				height = this.parentGame.gameHeight() * div;

			}

		}

		return height;

	}

	/**
	* Sets all of the children to immovable or not
	*
	* @param {boolean} immovable If they should be able to move, true means the children won't move
	*/
	this.setImmovable = function(immovable) {
		// Set immovable on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setImmovable(immovable);

	}

	/**
	* If the object should collide with the world boundaries.
	*
	* @param {boolean} collide If it should collide
	*/
	this.collideWorldBounds = function(collide) {
		// Set if collisions are on for all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].collideWorldBounds(collide);

	}

	/**
	* Sets the angle on all of the children
	*
	* @param {number} angle The angle to set the children
	*/
	this.setAngle = function(angle) {
		// Set the angle on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setAngle(angle);
	}

	/**
	* Allows all of the children to be dragged with the mouse.
	*
	* @param draggable If the children can be dragged
	*/
	this.setDraggable = function(draggable) {
		// Set draggable on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setDraggable(draggable);

	}

	/**
	* Sets if the children collide with over object (only ones that were
	* already set with @see setCollision).
	*
	* @param {boolean} collisionOnDrag If the children should collide when being dragged
	*/
	this.setCollisionsOnDrag = function(collisionOnDrag) {
		// Set collision on drag on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setCollisionsOnDrag(collisionOnDrag);

	}

	/**
	* Set the x gravity on the child
	*
	* @param {number} gravityX The x gravity to give the children
	*/
	this.setGravityX = function(gravityX) {
		// Set gravity on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setGravityX(gravityX);

	}

	/**
	* Set the y gravity on the child
	*
	* @param {number} gravityY The y gravity to give the children
	*/
	this.setGravityY = function(gravityY) {
		// Set gravity on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setGravityY(gravityY);

	}

	/**
	* Set the alpha(transparency) of the children.
	*
	* @param alpha The alpha value to set between 0 and 1.
	*/
	this.setAlpha = function(alpha) {
		// Set alpha on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].setAlpha(alpha);

	}

	/**
	* Add a function to call when an animation on the children has finished playing.
	* Note: This will only work if loop is set to false on the animation!
	*
	* @param {function} action The function to call
	*/
	this.addActionOnAnimationComplete = function(action) {
		// Set addActionOnAnimationComplete on all children
		for(var i = 0; i < this.children.length; i++)
			this.children[i].addActionOnAnimationComplete(action);

	}

	/**
	 * Gets the total frames that a sprite has.
	 *
	 * @return The number of frames.
	 * @private
	 */
	this.getTotalFrames = function() {
		// Get the image from cache so we can get its dimensions
		var image = this.game.cache.getImage(this.name);
		width = image.width;
		height = image.height;

		// Work out the max number of frames
		var xFrames = Math.floor(width / this.spriteWidth);
		var yFrames = Math.floor(height / this.spriteHeight);

		return xFrames * yFrames;
	}

	// Set everything up when the object is instantiated.
	this.constructor();

}
