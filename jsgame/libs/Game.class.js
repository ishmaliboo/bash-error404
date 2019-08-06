/**
* Game class which is at the core of the project, this is the first
* class that should be initialized as all of the other classes rely
* on it as an interface to the Phaser Library.
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*
* @param {number} width The width of the game
* @param {number} height The height of the game
* @param {String} name The name of the game
*/
function Game(width, height, name){

    /** @member {Phaser.Game} */
    this.world;
	/** @member {Phaser.Background} */
    this.background;
	/** @member {Phaser.Background[]} */
    this.backgrounds;
	/** @member {function} */
    this.functionToUse;
	/** @member {args[]} */
    this.args;

    /**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
    *
    * @private
	*/
    this.constructor = function() {

        // This is a singleton so only create it if it has not already been created
        if (typeof Game.INSTANCE == 'undefined') {

            // If the name is set use it or use the default
            this.name = name || "My Headstart Game";

            // Default width and height
            width = width || 800;
            height = height || 600;

            // Set the document title to the name
            document.title = this.name
            // Create the phaser object - passes in an array of default functions
            this.world = new Phaser.Game(width, height, Phaser.AUTO, name, { preload: preload, create: create, update: update });

            this.backgrounds = [];
            // Set up the 'static' instance
            Game.INSTANCE = this;

        }

    }

    /**
	* Load an image to use as the background, can be used multiple times
	* if you want different backgrounds in your game
	*
	* @param {String} key The name of the reference to give the image for future use
	* @param {String} image String reference of the image to use for the player
	*/
    this.loadBackgroundImage = function(key, image) {

        // If this key has already been used
        if(this.backgrounds.indexOf(key) != -1)
            throw new Error("You have already used the key \"" + key + "\ for your background images! Please use another one!");

        // Add the key to the array
        this.backgrounds.push(key);

        // Load the image into memory
        this.world.load.image(key, image);
    };

    /**
	* Set the specified image as the background
    *
	* @param {String} key The name of the background to load
	* @param {number} width The width of the background, should be bigger then the canvas if scrolling
	* @param {number} height The height of the background, should be bigger then the canvas if scrolling
	* @param {number} x The x position to start the background from the top left hand corner
	* @param {number} y The y position to start the background from the top left hand corner
	*/
    this.setBackgroundImage = function(key, width, height, x, y) {

        // Key is not been setup
        if(this.backgrounds.indexOf(key) == -1)
            throw new Error("The key \"" + key + "\ has not been set for your background image!");

        // By default x and y coordinates are 0
        x = x || 0;
        y = y || 0;

        // Get the image from its key
        var image = this.world.cache.getImage(key);

        // Default width is the width of the image
        width = width || image.width;
        height = height || image.height;

        // Set the background
    	this.background = this.world.add.tileSprite(x, y, width, height, key);

    }

    /**
	* Game Height function that returns the height of the game, useful when
	* a percentage is given as the size in pixels will be returned
	*
	* @return {number} Returns the height of the game in pixels
	*/
    this.gameHeight = function(){
        return this.world.world.height;
    };

    /**
	* Game Width function that returns the height of the game, useful when
	* a percentage is give as the size in pixels will be returned
	*
	* @return {number} Returns the width of the game in pixels
	*/
    this.gameWidth = function(){
        return this.world.world.width;
    };

	/**
	* Scoll the background along the x axis
	*
	* @param {number} x The amount to scroll the background by along the x axis
	*/
    this.scrollBackgroundX = function(x) {
    	this.background.tilePosition.x += x;
    }

	/**
	* Scoll the background along the y axis
	*
	* @param {number} y The amount to scroll the background by along the y axis
	*/
    this.scrollBackgroundY = function(y) {
    	this.background.tilePosition.y += y;
    }

	/**
	* Get the current game time in milliseconds
	*
	* @return {number} time The current game time in milliseconds
	*/
    this.getGameTime = function() {
    	return this.world.time.now;
    }

	/**
	* Pause the game
	*/
    this.pause = function() {
    	this.world.paused = true;
    }

    /**
	* Resume the game
	*/
    this.resume = function() {
    	this.world.paused = false;
    }

    /**
    * Set the background colour of the game, this is shown if
    * there is no image currently loaded.
    *
    * @param {String} colour The colour to set the background
    * must be a hexadecimal colour.
    */
    this.setBackgroundColour = function(colour) {
        this.world.stage.backgroundColor = colour;
    }

    /**
	* Used to swap the z indexes of two Sprites
    *
	* @param {Object} obj1 The first object to swap
	* @param {Object} obj2 The second object to swap
	*/
    this.swap = function(obj1, obj2) {

        if(typeof obj1.group === "undefined" || typeof obj2.group === "undefined") {
            throw new Error("You can currently only swap Sprites");
        }

        // Get the objects z indexes
        var obj1ZIndex = obj1.group.z;
        var obj2ZIndex = obj2.group.z;

        // Get the objects indexes in the array, they are the z index - 1
        var obj1Index = obj1ZIndex - 1;
        var obj2Index = obj2ZIndex - 1;

        // References to the children these objects represent
        var childA = game.world.stage.children[obj1Index];
        var childB = game.world.stage.children[obj2Index];

        // Switch the indexes around
        obj1.group.z = obj2ZIndex;
        obj2.group.z = obj1ZIndex;

        // Swap the objects on the games stage
        game.world.stage.children[obj1Index] = childB;
        game.world.stage.children[obj2Index] = childA;

   }

    /**
    * Check collisions between two objects
    *
    * Used Internally
    *
    * @param {Object} obj1 The first object to check a collision against
    * @param {Object} obj2 The second object to check a collision against
    * @param {boolean} overlap If overlap or collision should be used
    * @param {function} functionToUse The function to call when a collision is detected
    * @param {args[]} args Array of arguments to pass through to functionToUse
    * @param {function} additionalFunctionToUse A function to call before calling functionToUse, will only
    *                                           call functionToUse is additionalFunctionToUse returns true
    * @private
    */
    this.collision = function(obj1, obj2, overlap, functionToUse, args, additionalFunctionToUse) {

        // Ensure they are casted correctly
        obj1 = objectType(obj1);
        obj2 = objectType(obj2);

        if(typeof functionToUse === 'undefined')
            functionToUse = null;

        if(typeof additionalFunctionToUse === 'undefined')
            additionalFunctionToUse = null;

        // Dont overlap by default
        if(typeof overlap === 'undefined')
            overlap = false;

        this.functionToUse = functionToUse;

        this.args = args;

        var collided = false;

        if(overlap)
            collided = this.world.physics.arcade.overlap(obj1, obj2, this.callBack, additionalFunctionToUse, this);
        else
            collided = this.world.physics.arcade.collide(obj1, obj2, this.callBack, additionalFunctionToUse, this);

        // This function is called every frame so args and functionToUse may be set
        // So ensure they are unset for the next iteration
        if(!collided) {
            this.args = null;
            this.functionToUse = null;
        }

        // Return if there was a collision
        return collided;

    }

    /**
    * Check collisions between two objects
    *
    * @param {Object} obj1 The first object to check a collision against
    * @param {Object} obj2 The second object to check a collision against
    * @param {function} functionToUse The function to call when a collision is detected
    * @param {args[]} args Array of arguments to pass through to functionToUse
    * @param {function} additionalFunctionToUse A function to call before calling functionToUse, will only
    * call functionToUse is additionalFunctionToUse returns true
    */
    this.checkCollision = function(obj1, obj2, functionToUse, args, additionalFunctionToUse) {
        return this.collision(obj1, obj2, false, functionToUse, args, additionalFunctionToUse);
    }

    /**
    * Check overlapping between two objects
    *
    * @param {Object} obj1 The first object to check a collision against
    * @param {Object} obj2 The second object to check a collision against
    * @param {function} functionToUse The function to call when a collision is detected
    * @param {args[]} args Array of arguments to pass through to functionToUse
    * @param {function} additionalFunctionToUse A function to call before calling functionToUse, will only
    *                                           call functionToUse if there is an overlap. An object is passed through to this function allowing you to get some good info on the overlap, e.g. its position.
    */
    this.checkOverlap = function(obj1, obj2, functionToUse, args, additionalFunctionToUse) {
        return this.collision(obj1, obj2, true, functionToUse, args, additionalFunctionToUse);
    }

    /**
    * Gets the object type to check against, could be a group
    * or could be a child
    *
    * Used Internally.
    *
    * @param {Object} obj The object to check
    * @return {Object} obj The object type that's being checked
    * @private
    */
    objectType = function(obj) {

        if(obj instanceof Sprite)
            return obj.group;

        if(obj instanceof GroupChild)
            return obj.child;

    }

    /**
    * Custom callback function that allows parameters to be added to the function.
    * This is currently not available in the Phaser API.
    *
    * Used Internally via @see collision
    *
    * The 'arguments' and 'function to call' are stored in the field variables and are changed each time
    * a collision is true. This is a very hacky way of doing it but it currently works and is currently
    * the only solution as you cannot pass a function with parameters as a function reference.
    *
    * @param {Object} obj1  The first object that is part of the collision, it is passed through
    *                       by the Phaser Collision method.
    * @param {Object} obj2  The second object that is part of the collision, it is passed through
    *                       by the Phaser Collision method.
    * @private
    */
    this.callBack = function(obj1, obj2) {

        // Add these two passed through parameters to our parameters array
        var argsArray = [new GroupChild(obj1, this), new GroupChild(obj2, this)].concat(this.args);

        // Set the field value to null so it's not used next time
        this.args = null;

        // Set the field value to null so it's not used next time
        var functionToUseNow = this.functionToUse;
        this.functionToUse = null;

        // Fire the desired function with the additional parameters
        if(functionToUseNow != null)
            functionToUseNow.apply(functionToUseNow, argsArray);
    }

    /**
     * Get the games instance
     * @return {Game} The game
     */
    Game.GET_INSTANCE = function() {
        return Game.INSTANCE;
    }

   // Set everything up when the object is instantiated.
   this.constructor();

};
