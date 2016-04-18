/**
 * Init all game relevant stuff
 */
function Create(game, model, tool) {

	var newRect = function(xIn,yIn){

		var xStart = c.playField.xStart;
		var yStart = c.playField.yStart;
		var xSize = c.playField.xSize / c.grid.x;
		var ySize = c.playField.ySize / c.grid.y
		xStart += xIn * xSize;
		yStart += yIn * ySize;
		return {
			rect : new Phaser.Rectangle(xStart, yStart, xSize, ySize),
			x : xIn,
			y : yIn,
			xCenter : xStart + xSize / 2,
			yCenter : yStart + ySize / 2
		}
	};
	
	
	var createRects = function(){
		//creates the rectangles according to the model and constant data
		var aShape = model.getShape();
		var aRects = [];
		
		for(yPos = 0; yPos < c.grid.y; yPos++){
			for(xPos = 0; xPos < c.grid.x; xPos++){
				if(aShape[yPos][xPos]===1){
					aRects.push(newRect(xPos,yPos));
				}
			}
		}
		return aRects;
	}
	
	return function() {
		// Fuction called after 'preload' to setup the game

		
		// Init data model
		model.createStartShape();
		model.setRects(createRects());
		
		game.stage.backgroundColor = c.color.backgound;
		var lines = [];
		lines.push(new Phaser.Rectangle(c.playField.xStart, c.playField.yStart,
										c.playField.xSize, c.playField.ySize));
		model.setLines(lines);
		game.add.button(10,10,'uparrowon', function() {
			switchAction(-1);
		}, this);
		game.add.text(16,16,"Overlap", { fill: '#ffffff' });
		

	};

}