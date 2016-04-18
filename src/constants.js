var c = {
	color : {
		backgound : '#1261c4',
		playarea : '#32d050',
		shape : '#d030e0',
		shape2 : '#d03040'
		
	},
	size : {
		x : 1280,
		y : 640
	},
	sizeMin : {
		x : 640,
		y : 320
	},
	sizeMax : {
		x : 2560,
		y : 1280
	},
	grid : {
		x : 7,
		y : 7
	},
	startshape : {
		xs : 3-1,  // Minus 1 because it starts at 0
		ys : 3-1,
		xe : 5-1,
		ye : 5-1,
	}

};
c.playField = {
		xSize : 500,
		ySize : 500,
		xStart : (c.size.x - 500) / 2,
		yStart : 100
	};

