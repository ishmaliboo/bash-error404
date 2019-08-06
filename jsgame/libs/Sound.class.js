/**
* Sound class allows the playing of singular or looped sounds
* Unfortunately sound currently does not work on the lab machines
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*
* @param {String} sound The string reference of the sound to use
* @param {number} volume Optional Value between 0 and 1, the default is 1
* @param {boolean} loop Optional boolean value stating if the audio should loop, default is false
* @param {String} name Name of the sound
*/
function Sound(sound, volume, loop, name){

	/** @member {Phaser.Game} **/
	this.game;
	/** @member {String} **/
	this.name;
	/** @member {String} **/
	this.sound;
	/** @member {Phaser.Sound} **/
	this.audio;

	/**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
	*
	* @private
	*/
	this.constructor = function() {

		//Set up a counter to give unique names to each object
		if ( typeof Sound.counter == 'undefined' ) {
			Sound.counter = 1;
		} else {
			Sound.counter++;
		}

		// Get the phaser game
		this.game = Game.GET_INSTANCE().world;

		// Use a Generaic name if not set
		this.name = this.name || "Sound" + Sound.counter;

		// Store the sound
		this.sound = sound;

		// Set volume to 1 if not set
		volume = volume || 1;
		// Set loop to false if not set
		loop = loop || false;

		// Load in the audio file
		this.game.load.audio(this.name, this.sound);
		// Create the audio
		this.audio = this.game.add.audio(this.name, volume, loop);

		// Allow multiple by default
		this.allowMultiple(true);

	}

	/**
	* Play the sound
	*/
	this.play = function() {
		this.audio.play();
	}

	/**
	* Pause the sound
	*/
	this.pause = function() {
		this.audio.pause();
	}

	/**
	* Restart the sound
	*/
	this.restart = function() {
		this.audio.restart();
	}


	/**
	* Resume the sound after pausing
	*/
	this.resume = function() {
		this.audio.resume();
	}

	/**
	* Stop the sound
	*/
	this.stop = function() {
		this.audio.stop();
	}

	/**
	* Allow multiple instances of the sound and other sounds.
	*
	* You will need to set this to true if you want multiple
	* sounds paying at once.
	*
	* @param {boolean} allowMultiple If multiple sounds are allowed
	*/
	this.allowMultiple = function(allowMultiple) {
		this.audio.allowMultiple = allowMultiple;
	}

	// Set everything up when the object is instantiated.
	this.constructor();

};
