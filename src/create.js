/**
 * Init all game relevant stuff
 */
function Create(game, model, tool) {



	return function() {
		// Fuction called after 'preload' to setup the game

		
		// Init data model
		model.createStartShape();
		model.setRects(model.createRects());
		
		game.stage.backgroundColor = c.color.backgound;
		var lines = [];
		var xs=c.playField.xSize;
		lines.push(new Phaser.Rectangle(c.playField.xStart, c.playField.yStart,
										c.playField.xSize, c.playField.ySize));
		model.setLines(lines);
		game.add.button(100,100,'vertical', function() {
			model.setBrush(new Phaser.Rectangle(0, 0, c.playField.xSize / 3, c.playField.ySize / 1.5));
		}, this);
		game.add.button(100,233,'horizontal', function() {
			model.setBrush(new Phaser.Rectangle(0, 0, c.playField.xSize / 1.5, c.playField.ySize /3));
		}, this);
		game.add.button(100,366,'circle', function() {
			model.setBrush(new Phaser.Circle(0, 0, c.playField.xSize / 3));
		}, this);
		game.add.button(100,500,'tri1', function() {
			model.setBrush(new Phaser.Polygon([0 ,0 ,xs / 2 ,0 ,xs / 2,xs / 2]));
		}, this);
		game.add.text(470,16,"Squeeze me in", { fill: '#ffffff',fontSize : 50 });
		
		model.setBrush(new Phaser.Rectangle(0, 0, c.playField.xSize / 3, c.playField.ySize / 1.5));

		model.setGoal();
		
	};

}