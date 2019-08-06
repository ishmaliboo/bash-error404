/**
* Standard key class See {@link www.phaser.io|Phaser}
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*
* @param {Phaser.Key} key The key to listen to events on
*/
function Key(key) {

    /** @member {Phaser.Key} */
    this.inputHandler;
    /** @member {boolean} */
    this.justClicked;

    /**
	* The constructor used to encapsulate the code run when the object
	* is first instantiated. It is called at the bottom of the file.
	* So it does not need to be called as it has already been called.
    *
    * @private
	*/
    this.constructor = function() {
        // Store this key
        this.inputHandler = key;
        // Used for the on click
        this.justClicked = false;
    }

	/**
	* Is Down function that returns if the key is currently held down or not
	*
	* @return {boolean} If the key is currently held down or not
	*/
	this.isDown = function() {
		return this.inputHandler.isDown;
    }

    /**
    * Returns true if the key has just been pressed, useful of you want to do
    * something on a click and not continuously when the key is held down.
    *
    * @return {boolean} If the key was just clicked
    */
    this.justPressed = function() {

        // Key is pressed and has not been clicked yet
        if(this.isDown() && !this.justClicked) {

            this.justClicked = true;

            return true;

        }
        // Key is still down and not released yet
        else if(this.isDown() && this.justClicked) {

            return false;

        }
        // Key has just been released so reset justClicked
        else if(!this.isDown() && this.justClicked) {

            this.justClicked = false;

            return false;
        }

    }

	// Set everything up when the object is instantiated.
	this.constructor();

};
