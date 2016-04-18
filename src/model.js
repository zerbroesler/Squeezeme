function Model() {

	var that = this;
	var lines = [];
	var aShape = [];
	var aRects = [];
	var aMoving = [];
	
	this.getLines = function(){
		return lines;
	}
	this.setLines = function(linesIn){
		lines = linesIn;
	}
	
	// Model
	this.createStartShape = function(){
		// Initializes the model of the shape i.e. an rectangle within a play area
		aShape = [];
		for(yPos = 0; yPos < c.grid.y; yPos++){
			aShape.push([]);
			for(xPos = 0; xPos < c.grid.x; xPos++){
				aShape[yPos].push(0);
				if(xPos>=c.startshape.xs && xPos<=c.startshape.xe &&
					yPos>=c.startshape.ys && yPos<=c.startshape.ye){
					aShape[yPos][xPos]=1;
				}
			}
		}
	}
	var cleanShape = function(){
		// Sets all 2 values to 0
		for(yPos = 0; yPos < c.grid.y; yPos++){
			for(xPos = 0; xPos < c.grid.x; xPos++){
				if(aShape[yPos][xPos]===2){
					aShape[yPos][xPos]=0;
				}
			}
		}
	};
	
	this.getShape = function(){
		return aShape;
	}
	
	this.setRects = function(aRectsIn){
		// Phaser rects of the current shape
		aRects = aRectsIn;
	}
	this.getRects = function(){
		// Phaser rects of the current shape
		return aRects;
	}
	this.getRectCenter = function(){
		var xCenter = 0;
		var yCenter = 0;
		var iRectCount = aRects.length;
		for(rectno=0;rectno<iRectCount;rectno++){
			var oRect = aRects[rectno];
			xCenter += oRect.xCenter;
			yCenter += oRect.yCenter;
		}
		xCenter /= iRectCount;
		yCenter /= iRectCount;
		
		return {
			x: xCenter,
			y: yCenter
		};
	};
	
	var getFree = function(oRect){
		// Checks which positions are free in aShape and returns an array with all free positions
		// sorted by the distance to the given position
		var aFree = [];
		for(yPos = 0; yPos < c.grid.y; yPos++){
			for(xPos = 0; xPos < c.grid.x; xPos++){
				var oShape = aShape[yPos][xPos];
				if(oShape===0){
					// It is free, check the distance
					var xDist = oRect.xTarget-xPos;
					var yDist = oRect.yTarget-yPos;
					var dist = Math.sqrt(xDist * xDist + yDist * yDist);
					aFree.push({
						x:xPos,
						y:yPos,
						d:dist
					});
				}
			}
		}
		aFree.sort(function(a,b){
			return a.d - b.d;
		});
		return aFree;
	}
	
	this.setMoving  = function(aMovingIn){
		aMoving = aMovingIn;
	}
	this.move  = function(){
		// Fist see where the center is
		var oCenter = this.getRectCenter();
		
		// Calculate the vector to the center
		
		for(rectno=0;rectno<aMoving.length;rectno++){
			var oRect = aMoving[rectno];
			var oVector = {};
            // Mark in shape to be not entered (2)
			aShape[oRect.y][oRect.x] = 2;
			//
			oVector.x = oRect.xCenter - oCenter.x;
			oVector.y = oRect.yCenter - oCenter.y;
			oVector.l = Math.sqrt(oVector.x * oVector.x + oVector.y * oVector.y);
			// move along the vector to the other side
			var target = {
				x: oRect.xCenter - 2 * oVector.x,
				y: oRect.yCenter - 2 * oVector.y
			};
			oRect.xTarget = (target.x -  c.playField.xStart) / c.playField.xSize * c.grid.x;
			oRect.yTarget = (target.y -  c.playField.yStart) / c.playField.ySize * c.grid.y;
			// Round to grid
			oRect.xTargetR = Math.round(oRect.xTarget);
			oRect.yTargetR = Math.round(oRect.yTarget);
		}
		// Sort the rects by distance to center 
		// Move the ones which are nearest to center first
		aMoving.sort(function(a,b){
			return a.l - b.l;
		});
		// Move the nearest to center first
		for(rectno=0;rectno<aMoving.length;rectno++){
			var oRect = aMoving[rectno];
			
			// Check if target is free
			var aFree = getFree(oRect);
			target.x = aFree[0].x;
			target.y = aFree[0].y;
			
			var xStart = c.playField.xStart;
			var yStart = c.playField.yStart;
			var xSize = c.playField.xSize / c.grid.x;
			var ySize = c.playField.ySize / c.grid.y
			xStart += target.x * xSize;
			yStart += target.y * ySize;
			// Mark the move in the shape array
			aShape[target.y][target.x]=1;
			

			oRect.rect.x = xStart;
			oRect.rect.y = yStart;
			oRect.x = target.x;
			oRect.y = target.y;
			oRect.xCenter = xStart + xSize / 2,
			oRect.yCenter = yStart + ySize / 2
		};
		cleanShape();
	}
	
};
