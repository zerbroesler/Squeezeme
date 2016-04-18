function Model() {

	var that = this;
	var lines = [];
	var aShape = [];
	var aRects = [];
	
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
	
	
};
