function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;


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
		if(oBrush.centerOn!==undefined){
			oBrush.centerOn(mx,my);
		}else{
			oBrush.x = mx;
			oBrush.y = my;
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
			game.debug.geom(aRects[rectno].rect,color);
		}

		var drawShape = function(oGeom,color){
			if(oGeom.type === 12){
				var points = oGeom.points;
				var length=points.length;
				for(i=0;i<length;i++){
					var p1=points[i];
					var p2=points[(i+1)%length];
					game.debug.geom(new Phaser.Line(p1.x, p1.y,p2.x,p2.y),color);
				}
			}else{
				game.debug.geom(oGeom,color,false);
			}
		};
		
		// Draw the goal
		var oGoal = model.getGoal();
		drawShape(oGoal,c.color.goal);

		
		// Draw the brush
		drawShape(oBrush,c.color.brush);
//		game.debug.geom(oBrush,c.color.brush);

		
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
