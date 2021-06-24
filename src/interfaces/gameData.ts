export interface GameData {
	game: Game;
	turn: number;
	board: Board;
	you: Snake;
}
export interface Game {
	id: string;
	ruleset: RuleSet;
	timeout: number;
}

export interface RuleSet {
	name: string;
	version: string;
}

export interface Board {
	height: number;
	width: number;
	snakes: [Snake];
	food: [Coordinates];
	hazards: [];
}

export interface Snake {
	id: string;
	latency: string;
	health: number;
	body: [Coordinates];
	head: Coordinates;
	length: number;
	shout: string;
}

export interface Coordinates {
	x: number;
	y: number;
}
