function Update(game, model, tool) {

	var controller = new Controller(model);


	return function() {
		// Function called 60 times per second
		var aRects = model.getRects();
 		var lines = model.getLines();


		for(lineno=0;lineno<lines.length;lineno++){
			game.debug.geom(lines[lineno],c.color.playarea);
		} 
		
		// Find out where the mouse is
        var mx = game.input.activePointer.worldX;
        var my = game.input.activePointer.worldY;
		var hoverrect = -1;
		var oRectData = null;

		for(rectno=0;rectno<aRects.length;rectno++){
			if(aRects[rectno].rect.contains(mx,my)){
				hoverrect = rectno;
				oRectData = aRects[rectno];
			}
		}
		
		
		
		// Draw the shape
		var aRects = model.getRects();
		var color = c.color.shape;
		for(rectno=0;rectno<aRects.length;rectno++){
			if(rectno === hoverrect){
				color = c.color.shape2;
			}else{
				color = c.color.shape;
			}
			game.debug.geom(aRects[rectno].rect,color);
		}
		
		// Process mouse
		if (hoverrect !== -1 && game.input.mousePointer.isDown){
			// move all rects to the moving array
			var aMoving = [];
			aMoving.push(oRectData);
			model.setMoving(aMoving);
			model.move();
		}
	};
}
