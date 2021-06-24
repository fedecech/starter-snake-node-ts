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

		for (let row = height - 1; row < height; row++) {
			for (let col = 0; col < width; col++) {
				const cord = { x: col, y: row };
				if (walls.indexOf(cord) === -1) {
					//walkable
					matrix[row][col] == 0;
				} else {
					//not walkable
					matrix[row][col] == 1;
				}
			}
		}
		return matrix;
	}

	private getWalls() {
		const { snakes } = this.gameData.board;
		const { body, head } = this.gameData.you;

		let walls: Coordinates[] = [];

		walls.concat(body);
		walls.push(head);
		snakes.forEach((s) => {
			const { head, body } = s;
			walls.push(head);
			walls.concat(body);
		});

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
