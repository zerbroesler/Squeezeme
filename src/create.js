/**
 * Init all game relevant stuff
 */
function Create(game, model, tool) {

	var createButtons = function(fork) {

		var switchAction = function(direction) {
			if (fork.disabled === true) {
				return;
			}
			if (direction === -1) {
				up.loadTexture('uparrowon');
				down.loadTexture('downarrow');
				fork.direction = -1;
			} else {
				up.loadTexture('uparrow');
				down.loadTexture('downarrowon');
				fork.direction = 1;
			}
		};
		var disableAction = function(direction) {
			if (direction === 1) {
				up.loadTexture('uparrowDisabled');
			} else {
				down.loadTexture('downarrowDisabled');
			}
		};
		var enableAction = function(direction) {
			if (direction === 1) {
				if (fork.direction === -1) {
					up.loadTexture('uparrowon');
				} else {
					up.loadTexture('uparrow');
				}
			} else {
				if (fork.direction === -1) {
					down.loadTexture('downarrow');
				} else {
					down.loadTexture('downarrowon');
				}
			}
		};

		var up = game.add.button(tool.posCalc.xPos(fork.x), tool.posCalc
				.yPos(fork.y - 10) - 16, 'uparrowon', function() {
			switchAction(-1);
		}, this);
		var down = game.add.button(tool.posCalc.xPos(fork.x), tool.posCalc
				.yPos(fork.y + 10) - 16, 'downarrow', function() {
			switchAction(1);
		}, this);
		fork.direction = -1;
		fork.eventSwitch = new Event();
		fork.eventSwitch.attach(switchAction);
		fork.eventDisable = new Event();
		fork.eventDisable.attach(disableAction);
		fork.eventEnable = new Event();
		fork.eventEnable.attach(enableAction);
	};
	var createSledge = function(yPos, r, g, b) {

		var sledgePos = tool.posCalc.xPos(100);

		var leaveSledge = function(sledge) {
			var tween = game.add.tween(sledge.sprite).to({
				x : sledgePos + 400,
			}, 1500, Phaser.Easing.Linear.None, true);
			// Also the parcels
			sledge.parcels.forEach(function(parcel) {
				var xCurrent = parcel.sprite.x;
				var tween = game.add.tween(parcel.sprite).to({
					x : xCurrent + 400,
				}, 1500, Phaser.Easing.Linear.None, true).onComplete
						.add(function() {
							// Remove parcels which have been delivered
							parcel.sprite.destroy();
						});
			});
		};
		var returnSledge = function(sledge) {
			var tween = game.add.tween(sledge.sprite).to({
				x : sledgePos,
			}, 1500, Phaser.Easing.Linear.None, true);
		};

	};
	var lines = [];

	this.addLine = function(x1, y1, x2, y2) {
		x1 = tool.posCalc.xPos(x1);
		x2 = tool.posCalc.xPos(x2);
		y1 = tool.posCalc.yPos(y1);
		y2 = tool.posCalc.yPos(y2);
		lines.push(new Phaser.Line(x1, y1, x2, y2));
	};

	return function() {
		// Fuction called after 'preload' to setup the game

		game.stage.backgroundColor = '#1261c4';
		// lines.push(new Phaser.Line(100, 100, 600, 100));
		// lines.push(new Phaser.Line(600, 100, 600, 600));
		// lines.push(new Phaser.Line(600, 600, 100, 600));
		// lines.push(new Phaser.Line(100, 600, 100, 100));
		lines.push(new Phaser.Rectangle(100, 50, 400, 400));
		model.setLines(lines);
		game.add.button(10,10,'uparrowon', function() {
			switchAction(-1);
		}, this);
		

	};

}