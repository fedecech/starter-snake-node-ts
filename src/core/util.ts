import { AStarFinder } from '../finders/astar-finder';
import { Coordinates } from '../interfaces/gameData';
import { PossibleMoves } from '../routes/move';;
import { Node } from './Node';

/**
 * Backtrace from end node through parents and return the path.
 * @param node
 * @param includeStartingNode
 */
export function backtrace(
	node: Node,
	includeStartNode: boolean,
	includeEndNode: boolean
): number[][] {
	// Init empty path
	const path: number[][] = [];

	let currentNode: Node;
	if (includeEndNode) {
		// Attach the end node to be the current node
		currentNode = node;
	} else {
		currentNode = node.getParent();
	}

	// Loop as long the current node has a parent
	while (currentNode.getParent()) {
		path.push([currentNode.position.x, currentNode.position.y]);
		currentNode = currentNode.getParent();
	}

	// If true we will also include the starting node
	if (includeStartNode) {
		path.push([currentNode.position.x, currentNode.position.y]);
	}

	return path.reverse();
}
/**
 * Find shortest path from point A to point B using A* algorithm.
 * @param s [starting cordinates]
 * @param e [ending coordinates]
 * @param matrix [2D array fo board]
 */
export const next_path = (
	s: Coordinates,
	e: Coordinates,
	matrix: number[][]
) => {
	return new AStarFinder({
		grid: {
			matrix,
		},
		diagonalAllowed: false,
		includeStartNode: false,
		includeEndNode: true,
	}).findPath(s, e);
};

/**
 * Finds next possible step where there is no obstacle.
 * @param head [starting coordinates]
 * @param walls [obstacles coordinates]
 * @param width [width of board]
 * @param height [height of board]
 */
const next_clear_step = (
	head: Coordinates,
	walls: Coordinates[],
	width: number,
	height: number
) => {
	const up = { x: head.x - 1, y: head.y, direction: PossibleMoves.UP };
	const dw = { x: head.x + 1, y: head.y, direction: PossibleMoves.DOWN };
	const lt = { x: head.x, y: head.y - 1, direction: PossibleMoves.LEFT };
	const rt = { x: head.x - 1, y: head.y + 1, direction: PossibleMoves.RIGHT };
	let dirs = [up, dw, lt, rt];

	// remove directions were there are external walls
	dirs = dirs.filter((d) => d.x < width && d.y < height);

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

export const next_move = (
	path: number[][],
	head: Coordinates,
	walls: Coordinates[],
	width: number,
	height: number
) => {
	if (path.length < 1) {
		return next_clear_step(head, walls, width, height);
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
