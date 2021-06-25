import { Coordinates, GameData } from '../interfaces/gameData';

export class Converter {
	private gameData: GameData;

	constructor(gameData: GameData) {
		this.gameData = gameData;
	}

	public getFood() {
		const { height, food } = this.gameData.board;
		let convertedFood: Coordinates[] = [];

		food.forEach((f) => {
			convertedFood.push(this.toTopBottomIndexed(f, height));
		});
		return convertedFood;
	}

	public getMatrix() {
		return this.gameDataToMatrix(this.gameData);
	}

	public getMySnakeHead() {
		const { head } = this.gameData.you;
		const { height } = this.gameData.board;

		return this.toTopBottomIndexed(head, height);
	}

	private gameDataToMatrix(gd: GameData) {
		const { width, height } = gd.board;
		const walls = this.getWalls();

		let matrix: number[][] = [];

		for (let row = 0; row < height; row++) {
			matrix[row] = [];
			for (let col = 0; col < width; col++) {
				const cord = { x: col, y: row };
				if (!walls.some((w) => w.x === cord.x && w.y === cord.y)) {
					//walkable
					matrix[row][col] = 0;
				} else {
					//not walkable
					matrix[row][col] = 1;
				}
			}
		}
		return matrix;
	}

	public getWalls() {
		const { snakes, height } = this.gameData.board;
		const { id } = this.gameData.you;
		let walls: Coordinates[] = [];

		snakes.forEach((s) => {
			const { head } = s;
			let body = s.body;
			// filter head from body if its my snake
			if (s.id === id) {
				body = body.filter((s) => s.x != head.x || s.y != head.y);
			}

			walls = walls.concat(body);
		});

		for (let i = 0; i < walls.length; i++) {
			walls[i] = this.toTopBottomIndexed(walls[i], height);
		}
		return walls;
	}

	// method that converts points from gameData to matrix indexed points
	// gameData idexing:
	//  0 1 2 3
	// 3
	// 2
	// 1
	// 0
	// matrix idexing:
	//  0 1 2 3
	// 0
	// 1
	// 2
	// 3
	public toTopBottomIndexed(p: Coordinates, rows: number) {
		return { x: p.x, y: rows - p.y - 1 };
	}
}
