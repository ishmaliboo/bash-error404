/**
 * Will load in all of the classes as we have many!
 * Creates script tags in the head.
 *
 * @param main The name of the js file to load in
 *
 * @author Joshua Small [joshuahugh94@gmail.com/smalljh@aston.ac.uk]
 * @version 1.0
 * @class
 * @private
 */
function ClassLoader(main) {

    /* @member Our library classes to load in */
    this.classes = [
        "phaser.min.js",
        "Game.class.js",
        "Button.class.js",
        "GroupChild.class.js",
        "HighScore.class.js",
        "Key.class.js",
        "Keyboard.class.js",
        "Mouse.class.js",
        "Sound.class.js",
        "Sprite.class.js",
        "Text.class.js"
    ];
    /* @memberTracks how many of the classes have loaded */
    this.loadedCounter = 0;

    /**
     * Add a script to the page.
     * Each script will fire an event when it has loaded so that we know
     * when it is safe to load in the main js file.
     *
     * @param src The scripts src to load in
     */
    this.addScript = function(src) {
        var self = this;
        // Create the script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        // Our onload event
        script.onload = function() {
            self.loaded();
        }
        // Add to the page
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // Loop through and add each class
    for(var i = 0; i < this.classes.length; i++) {
        this.addScript('libs/' + this.classes[i]);
    }

    /**
     * Gets called on each script that is loaded.
     */
    this.loaded = function() {
        this.loadedCounter++;

        // When all scripts have loaded load the main js file
        if(this.loadedCounter == this.classes.length) {
            this.addScript(main);
        }
    }


}
