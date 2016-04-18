function Update(game, model, tool) {

	var newParcelTimer = 0; // Timer to create new parcel
	var parcelTimespan = 2600;
	// Test for one parcel
	var parcelSpeed = 20; // In percent per second
	var controller = new Controller(model);

	var getColor = function(color) {
		switch (color) {
		case 0:
			return {
				r : 255,
				g : 0,
				b : 0
			};
			break;
		case 1:
			return {
				r : 0,
				g : 255,
				b : 0
			};
			break;
		case 2:
			return {
				r : 0,
				g : 0,
				b : 255
			};
			break;
		case 3:
			return {
				r : 255,
				g : 255,
				b : 0
			};
			break;

		default:
			break;
		}
	};

	var generateParcel = function(c1, c2) {
	};

	var moveParcel = function(parcel, parcelAdvance) {
		var checkFork = function(parcel, forkNumber, fork) {
			if (parcel.pos >= fork.x && parcel.pos - parcelAdvance < fork.x) {
				// The parcel just reached/passed the fork
				var direction = controller.setForkDirection(parcel, fork);
				switch (direction) {
				case -1:
				case 1:
					if(fork.disabled!==true){
						fork.direction = direction;
						model.switchFork(fork, direction);
					}else{
						// Cannot switch fork
						if(direction!==fork.direction){
							console.log('Cannot switch disabled fork');
						}
					}
					break;
				default:
					break;
				}

				// Parcel takes the route
				parcel['f' + forkNumber] = fork.direction;
			}
		};

		if (parcel.pos !== 999 || parcel.pos === 1000) {
			parcel.pos += parcelAdvance;
		}
		if (parcel.pos >= 100 && parcel.pos - parcelAdvance < 100) {
			parcel.pos = 999;
		}

		checkFork(parcel, 0, model.getFork(0));
		if (parcel.f0 === -1) {
			checkFork(parcel, 1, model.getFork(1));
		} else {
			checkFork(parcel, 1, model.getFork(2));
		}
	};
	var addParcelToSledge = function(parcel) {
		// see which position on the sledge is free
		var sledgePlace = model.addParcelToSledge(parcel);

		// Get the coordinates of the place
		return tool.posCalc.getSledgePosition(sledgePlace);
	};

	var setParcelSprite = function(parcel) {
		var parcelPos = parcel.pos;
		var xPos = 0;
		var yPos = 0;
		var f1 = c.forkPos[0];
		var f2 = c.forkPos[1];
		var end = 100;
		var spread1 = 30;
		var spread2 = 15;

		if (parcelPos <= f1) {
			// Starting lane
			xPos = tool.posCalc.xPos(parcelPos);
			yPos = tool.posCalc.yPos(0);
		} else if (parcelPos <= f2) {
			// after first fork
			xPos = tool.posCalc.xPos(parcelPos);
			yPos = tool.posCalc.yPos(spread1 * (parcelPos - f1) / (f2 - f1) *
					parcel.f0, 0);
		} else if (parcelPos <= 100) {
			// after second fork
			xPos = tool.posCalc.xPos(parcelPos);
			yPos = tool.posCalc.yPos(spread1 * parcel.f0 + spread2 *
					(parcelPos - f2) / (end - f2) * parcel.f1, 0);
		} else if (parcelPos == 999) {
			parcel.pos = 1000;
			// When at end
			var xCurrent = tool.posCalc.xPos(100);
			var yCurrent = tool.posCalc.yPos(spread1 * parcel.f0 + spread2 *
					parcel.f1, 0);
			var sledgePos = addParcelToSledge(parcel);
			var sledgeNumber = model.getSledgeNumber(parcel);
			model.checkSledgeToLeave(sledgeNumber);

			var tween = game.add.tween(parcel.sprite).to({
				x : xCurrent + sledgePos.x,
				y : yCurrent + sledgePos.y - 10
			}, 500, Phaser.Easing.Linear.None, true);
		}
		if (xPos !== 0) {
			parcel.sprite.x = xPos - 20;
			parcel.sprite.y = yPos - 40;
		}
	};

	return function() {
		// Function called 60 times per second
		var lines = model.getLines();
		for(lineno=0;lineno<lines.length;lineno++){
			game.debug.geom(lines[lineno],c.color.playarea);
		}
	};

}
