/**
* Text Class used to add text to the screen with the ability to
* change its values at run time.
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*
* @param {String} message The message to display on the screen
* @param {int} x X position of the text
* @param {int} y Y position of the text
* @param {String} size A string of the size in pixels, e.g. “34px”
* @param {String} font Font of the text in string format
* @param {String} colour The hex value of a colour in string format (e.g. #FFFFFF)
*/
function Text(message, x, y, size, font, colour) {

	/** @member {Phaser.Game} */
	this.game;
	/** @member {int} */
	this.size;
	/** @member {Phaser.Text} */
	this.text;

	/**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
	*/
	this.constructor = function() {
		// Get the phaser game
		this.game = Game.GET_INSTANCE().world;

		// Store the size
		this.size = size;
		// Create the text
		this.text = this.game.add.text(x, y, message, { font: size + " " + font, fill: colour });

	}

	/**
	* Change the colour of the text
	*
	* @param {String} colour String hexadecimal representation of a colour
	*/
	this.changeColour = function(colour) {
		this.text.fill = colour;
	}

	/**
	* Set the x position of the text
	*
	* @param {int} x he x position to set the text
	*/
	this.changeX = function(x) {
		this.text.x = x;
	}

	/**
	* Set the y position of the text
	*
	* @param {int} y The y position to set the text
	*/
	this.changeY = function(y) {
		this.text.y = y;
	}

	/**
	* Change the size of the text
	*
	* @param {int} size The size of the text
	*/
	this.changeFontSize = function(size) {
		this.text.fontSize = size + "px";
	}

	/**
	* Change the text font
	*
	* @param {String} font The font to change to
	*/
	this.changeFont = function(font) {
		this.text.font = font;
	}

	/**
	* Set if the text is visible
	*
	* @param {boolean} visible If the text should be visible
	*/
	this.setVisible = function(visible) {
		this.text.visible = visible;
	}

	/**
	* Change the text to display
	*
	* @param {String} text The text to change to
	*/
	this.changeText = function(text) {
		this.text.setText(text)
	}

	// Set everything up when the object is instantiated.
	this.constructor();

};
