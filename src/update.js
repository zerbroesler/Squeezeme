function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;


	return function() {
		// Function called 60 times per second
		var aRects = model.getRects();
 		var lines = model.getLines();
		var aMoving = [];
		var graphics = model.getGraphics();
		graphics.clear();


		for(lineno=0;lineno<lines.length;lineno++){
			r=lines[lineno];
			graphics.beginFill(c.color.playarea,1);
			graphics.drawShape(r);
			graphics.endFill();
		} 
		
		// Find out where the mouse is
        var mx = game.input.activePointer.worldX;
        var my = game.input.activePointer.worldY;
		var oRectData = null;

		// Set brush position
		var oBrush2 = model.getBrush();
		if(oBrush2.centerOn!==undefined){
			oBrush2.centerOn(mx,my);
		}else{
			oBrush2.x = mx;
			oBrush2.y = my;
		}
		var oBrush = oBrush2.clone();
		if(oBrush.type === 12){
			// transform to new position
			var points = oBrush.points;
			for(i=0;i<points.length;i++){
				points[i].x += oBrush2.x-120;
				points[i].y += oBrush2.y-120;
			}
		}

		
		
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
			graphics.beginFill(color);
			graphics.drawShape(aRects[rectno].rect);
			graphics.endFill();
		}
		
		// Draw the goal
		var oGoal = model.getGoal();
		graphics.lineStyle(1,c.color.goal,1);
		graphics.drawShape(oGoal);

		
		// Draw the brush
			graphics.beginFill(c.color.brush,0.6);
			graphics.drawShape(oBrush);
			graphics.endFill();

		
		// Process mouse
		if (game.input.mousePointer.isDown && down === false && won === false){
			down = true;
			// move all rects to the moving array
			model.setMoving(aMoving);
			model.move();
			if(model.checkIfIn()===true){
				won = true;
				var but = game.add.button(900,250,'nextLevel', function() {
					model.nextLevel();
					won = false;
					but.kill();
				}, this);
			}
		}else{
			down = false;
		}
	};
}
