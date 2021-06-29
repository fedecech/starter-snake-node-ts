import { Heuristic } from '../core/Heuristic';
import { Coordinates } from '../interfaces/gameData';
import { Router, Request, Response } from 'express';
import { GameData } from '../interfaces/gameData';
import { Converter } from '../core/Converter';
import { next_move, next_path } from '../core/util';

const router = Router();

export enum PossibleMoves {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right',
}

const logs = (gameData: GameData, matrix: number[][], food: Coordinates[]) => {
	console.log('Game Id: ', gameData.game.id);
	console.log('Turn ', gameData.turn);
	console.log('Board: ', matrix);
	console.log('Food', food);
};

router.post('/move', (req: Request, res: Response) => {
	const gameData = req.body as GameData;
	const { width, height } = gameData.board;

	const converter = new Converter(gameData);
	const matrix = converter.getMatrix();
	const food = converter.getFood();
	const head = converter.getMySnakeHead();
	const walls = converter.getWalls(); // change beacuse is doing usless calcs ? maybe store walls in instace var

	logs(gameData, matrix, food);

	let min_distance = 100; // because max is 19x19 grid
	let next_food = food.length > 0 ? food[0] : null;

	food.forEach((f) => {
		const distance = Heuristic.calculateHeuristic('Manhatten', head, f);

		if (distance < min_distance) {
			min_distance = distance;
			next_food = f;
		}
	});

	const path = next_path(head, next_food, matrix);
	const move = next_move(path, head, walls, width, height);

	console.log('Head', head);
	console.log('Next food ', next_food);
	console.log('Path to next food', path);
	console.log('Move to next food', move);
	res.status(200).send({
		move,
	});
});

export { router as moveRouter };
