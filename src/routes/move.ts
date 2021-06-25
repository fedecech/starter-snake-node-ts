// import { AStarFinder } from './../finders/astar-finder';
import { Heuristic } from '../core/Heuristic';
import { Coordinates } from '../interfaces/gameData';
import { Router, Request, Response } from 'express';
import { GameData } from '../interfaces/gameData';
import { Converter } from '../core/Converter';
import { AStarFinder } from '../finders/astar-finder';

const router = Router();

enum PossibleMoves {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right',
}

const next_path = (s: Coordinates, e: Coordinates, matrix: number[][]) => {
	return new AStarFinder({
		grid: {
			matrix,
		},
		diagonalAllowed: false,
		includeStartNode: false,
		includeEndNode: true,
	}).findPath(s, e);
};

const next_clear_step = (head: Coordinates, walls: Coordinates[]) => {
	const up = { x: head.x - 1, y: head.y, direction: PossibleMoves.UP };
	const dw = { x: head.x + 1, y: head.y, direction: PossibleMoves.DOWN };
	const lt = { x: head.x, y: head.y - 1, direction: PossibleMoves.LEFT };
	const rt = { x: head.x - 1, y: head.y + 1, direction: PossibleMoves.RIGHT };
	const dirs = [up, dw, lt, rt];

	walls.forEach((w) => {
		if (w.x === up.x && w.y === up.y) {
			dirs.splice(dirs.indexOf(up));
		} else if (w.x === dw.x && w.y === dw.y) {
			dirs.splice(dirs.indexOf(dw));
		} else if (w.x === lt.x && w.y === lt.y) {
			dirs.splice(dirs.indexOf(lt));
		} else if (w.x === rt.x && w.y === rt.y) {
			dirs.splice(dirs.indexOf(rt));
		}
	});

	return dirs.length > 0 ? dirs[0].direction : PossibleMoves.LEFT; // all 4 ways (up, left, right, down) have walls
};
const next_move = (
	path: number[][],
	head: Coordinates,
	walls: Coordinates[]
) => {
	if (path.length < 1) {
		return next_clear_step(head, walls);
	}
	const step = path[0];
	const x = step[0];
	const y = step[1];

	if (x < head.x) {
		return PossibleMoves.LEFT;
	} else if (x > head.x) {
		return PossibleMoves.RIGHT;
	} else if (y > head.y) {
		return PossibleMoves.DOWN;
	} else {
		return PossibleMoves.UP;
	}
};

const logs = (gameData: GameData, matrix: number[][], food: Coordinates[]) => {
	console.log('Game Id: ', gameData.game.id);
	console.log('Turn ', gameData.turn);
	console.log('Board: ', matrix);
	console.log('Food', food);
};

router.post('/move', (req: Request, res: Response) => {
	const gameData = req.body as GameData;

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
	const move = next_move(path, head, walls);

	console.log('Head', head);
	console.log('Next food ', next_food);
	console.log('Path to next food', path);
	console.log('Move to next food', move);
	res.status(200).send({
		move,
	});
});

export { router as moveRouter };
