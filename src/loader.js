/**
 * 
 */
function Loader(game) {

	return function() {

		
		game.load.image('horizontal','sprite/brushHozizontal.png');
		game.load.image('vertical','sprite/brushVertical.png');
		game.load.image('circle','sprite/circle.png');
		game.load.image('tri1','sprite/tri1.png');

		game.load.image('nextLevel','sprite/nextLevel.png');
		
		// This sets a limit on the up-scale
		game.scale.maxWidth = c.sizeMax.x;
		game.scale.maxHeight = c.sizeMax.y;
		game.scale.minWidth = c.sizeMin.x;
		game.scale.minHeight = c.sizeMin.y;

		// Then we tell Phaser that we want it to scale up to whatever the
		// browser can handle, but to do it proportionally
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//		game.scale.setScreenSize();

	};

}