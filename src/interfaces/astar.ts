import { HeuristicFN } from './../core/Heuristic';
import { Coordinates } from './gameData';

export interface INodeConstructor {
	id: number;
	position: Coordinates;
	walkable?: boolean;
}

export interface IGridConstructor {
	width?: number;
	height?: number;
	matrix: number[][];
}

export interface IAStarFinderConstructor {
	grid: IGridConstructor;
	diagonalAllowed?: boolean;
	heuristic?: HeuristicFN;
	weight?: number;
	includeStartNode?: boolean;
	includeEndNode?: boolean;
}
