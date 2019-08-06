/**
* Mouse class that allows you to get some information about the mouse,
* mainly the cursor location and what to do when clicked.
*
* @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
* @version 2.0
* @class
*/
function Mouse(){

    /** @member {Game} */
    this.game;
    /** @member {Phaser.Input} */
    this.mouse;

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
        // The mouse
        this.mouse = this.game.input;
    }

    /**
    * Get the x position of the cursor
    *
    * @return {number} The x position of the cursor
    */
    this.mouseX = function() {
       return this.mouse.x;
    }

    /**
    * Get the y position of the cursor
    *
    * @return {number} The x position of the cursor
    */
    this.mouseY = function() {
       return this.mouse.y;
    }

    /**
    * Add a function to call when the mouse is clicked
    *
    * @param {function} functionToUse The function to use, will pass through the click event
    */
    this.onClick = function(functionToUse) {
        this.mouse.onDown.add(functionToUse, this);
    }

	// Set everything up when the object is instantiated.
	this.constructor();

};
