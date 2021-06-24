import { AStarFinder } from './../finders/astar-finder';
import { Heuristic } from 'src/core/Heuristic';
import { Coordinates } from '../interfaces/gameData';
import { Router, Request, Response } from 'express';
import { GameData } from '../interfaces/gameData';
import { Converter } from '../core/Converter';

const router = Router();

const possibleMoves = ['up', 'down', 'left', 'right'];

const next_move = (s: Coordinates, e: Coordinates, matrix: number[][]) => {
	return new AStarFinder({
		grid: {
			matrix,
		},
		diagonalAllowed: false,
		includeStartNode: false,
		includeEndNode: true,
	}).findPath(s, e);
};

router.post('/move', (req: Request, res: Response) => {
	const gameData = req.body as GameData;

	const converter = new Converter(gameData);
	const matrix = converter.getMatrix();
	const food = converter.getFood();
	const head = converter.getMySnakeHead();

	let min_distance = Heuristic.calculateHeuristic('Manhatten', head, food[0]);
	let next_food = food[0];
	food.forEach((f) => {
		const distance = Heuristic.calculateHeuristic('Manhatten', head, f);

		if (distance < min_distance) {
			min_distance = distance;
			next_food = f;
		}
	});
	const move = next_move(head, next_food, matrix);
	console.log(move);
	res.status(200).send({
		move,
	});
});

export { router as moveRouter };
