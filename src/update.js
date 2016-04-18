function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;


	return function() {
		// Function called 60 times per second
		var aRects = model.getRects();
 		var lines = model.getLines();
		var aMoving = [];


		for(lineno=0;lineno<lines.length;lineno++){
			game.debug.geom(lines[lineno],c.color.playarea);
		} 
		
		// Find out where the mouse is
        var mx = game.input.activePointer.worldX;
        var my = game.input.activePointer.worldY;
		var oRectData = null;

		// Set brush position
		var oBrush = model.getBrush();
		oBrush.x = mx;
		oBrush.y = my;

		// Check which fields of the shape are touched by the brush and will not be occupied
		// in this step
		aMoving = [];
		var aShape = model.getShape();
		var xShape = 0;
		var yShape = 0;
		model.cleanShape();
		for(yPos = 0; yPos < c.grid.y; yPos++){
			for(xPos = 0; xPos < c.grid.x; xPos++){
				xShape = xPos * (c.playField.xSize / c.grid.x) + c.playField.xStart;
				yShape = yPos * (c.playField.ySize / c.grid.y) + c.playField.yStart;
				if(oBrush.contains(xShape,yShape)){
					if(aShape[yPos][xPos]===0){
						aShape[yPos][xPos]=2;
					}
				}
			}
		}
		
		// Check which parts are touched by the brush
		aMoving = [];
		for(rectno=0;rectno<aRects.length;rectno++){
			if(oBrush.contains(aRects[rectno].xCenter,aRects[rectno].yCenter)){
				aRects[rectno].selected = true;
				aMoving.push(aRects[rectno]);
			}else{
				aRects[rectno].selected = false;
			}
		}
		
		
		
		// Draw the shape
		var aRects = model.getRects();
		var color = c.color.shape;
		for(rectno=0;rectno<aRects.length;rectno++){
			if(aRects[rectno].selected === true){
				color = c.color.shape2;
			}else{
				color = c.color.shape;
			}
			game.debug.geom(aRects[rectno].rect,color);
		}
		
		// Draw the brush
		game.debug.geom(oBrush,c.color.brush);
		
		// Process mouse
		if (game.input.mousePointer.isDown && down === false ){
			down = true;
			// move all rects to the moving array
			model.setMoving(aMoving);
			model.move();
		}else{
			down = false;
		}
	};
}
