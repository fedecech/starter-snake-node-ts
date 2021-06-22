export interface GameData {
	game: Game;
	turn: number;
	board: Board;
	you: Snake;
}
interface Game {
	id: string;
	ruleset: RuleSet;
	timeout: number;
}

interface RuleSet {
	name: string;
	version: string;
}

interface Board {
	height: number;
	width: number;
	snakes: [Snake];
	food: [Coordinates];
	hazards: [];
}

interface Snake {
	id: string;
	latency: string;
	health: number;
	body: [Coordinates];
	head: Coordinates;
	length: number;
	shout: string;
}

interface Coordinates {
	x: number;
	y: number;
}
