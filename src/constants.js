var c = {
	color : {
		backgound : '#1261c4',
		playarea : 0x32d050,
		shape : 0xd030e0,
		shape2 : 0xd03040,
		brush : 0xc8d020,
		goal : 0xf01010
		
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
		x : 50,
		y : 50
	},
	startshape : {
		xs : 15-1,  // Minus 1 because it starts at 0
		ys : 15-1,
		xe : 35-1,
		ye : 35-1,
	}

};
c.playField = {
		xSize : 500,
		ySize : 500,
		xStart : (c.size.x - 500) / 2,
		yStart : 100
	};

