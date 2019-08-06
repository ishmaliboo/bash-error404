/**
* Keyboard class, holds all of the possible keys available
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*/
function Keyboard() {

	/** @member {Phaser.Game} */
	this.game;
	/** @member {Phaser.Key} */
	this.phaserKeys;
	/** @member {Phaser.Key} */
	this.phaserKeyArrows;

	/**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
	*
	* @private
	*/
	this.constructor = function() {
		// Get the phaser game
		this.game = Game.GET_INSTANCE().world;
		// Get the keyboard object to interface with
		this.phaserKeys = this.game.input.keyboard;
		// Get the arrow keys object
		this.phaserKeyArrows = this.phaserKeys.createCursorKeys();
	}

	/**
	* Create a new input key by specifying its character, only works on the keys a-z
	*
	* @param {String} key The key to create	*
	* @return {Key} A Key that can be used
	*/
	this.createKey = function(key) {
		// Convert to uppercase as lowercase keys differ
		key = key.toUpperCase();
		// Get its key code, e.g A is 65
		var keyCode = key.charCodeAt();
		// Create a Key object and return
		return new Key(this.phaserKeys.addKey(keyCode));
	}

	/**
	* Create the space bar key
	*
	* @return {Key} The Spacebar key
	*/
	this.createSpaceKey = function() {
		return new Key(this.phaserKeys.addKey(Phaser.Keyboard.SPACEBAR));
	}

	/**
	* Create the Up arrow key
	*
	* @return {Key} The Up key
	*/
	this.createUpKey = function() {
		return new Key(this.phaserKeyArrows.up);
	}

	/**
	* Create the Down arrow key
	*
	* @return {Key} The Down key
	*/
	this.createDownKey = function() {
		return new Key(this.phaserKeyArrows.down);
	}

	/**
	* Create the Left arrow key
	*
	* @return {Key} The Left key
	*/
	this.createLeftKey = function() {
		return new Key(this.phaserKeyArrows.left);
	}

	/**
	* Create the Right arrow key
	*
	* @return {Key} The Right key
	*/
	this.createRightKey = function() {
		return new Key(this.phaserKeyArrows.right);
	}

	// Set everything up when the object is instantiated.
	this.constructor();

};
