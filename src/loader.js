/**
 * 
 */
function Loader(game) {

	return function() {

//		game.load.image('player', 'images/hello.png');
//
//		game.load.tilemap('minemap', 'src/mine.json', null,
//				Phaser.Tilemap.TILED_JSON);
//
//		game.load.image('minetiles', 'images/mineTiles.png');
//		game.load.image('watertiles', 'images/water.png');
//		game.load.image('lavatiles', 'images/lava.png');

		
//		game.load.image('parcel','sprites/parcel.png');
		
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