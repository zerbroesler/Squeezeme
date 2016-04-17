/*
 * 
 */

function init() {

	// Initialize Phaser, and creates a game
	var game = new Phaser.Game(c.size.x, c.size.y, Phaser.AUTO, 'game_div');
	var gameState = {};
	var tool = {
		events : {}
	};
	var model = new Model();

	// Creates a new 'main' state that will contain the game
	gameState.main = function() {
	};
	gameState.main.prototype = {

		preload : Loader(game),
		create : Create(game, model, tool),
		update : Update(game, model, tool),
		render : Render(game, model, tool),
	};

	// Add and start the 'main' state to start the game
	game.state.add('main', gameState.main);
	game.state.start('main');

}