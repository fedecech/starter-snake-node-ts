import { Coordinates } from './../interfaces/gameData';
import { IGridConstructor } from './../interfaces/astar';
import { Node } from './Node';

export class Grid {
	readonly width: number;
	readonly height: number;
	readonly numberOfFields: number;

	private gridNodes: Node[][];

	constructor(params: IGridConstructor) {
		if (params.width && params.height) {
			this.width = params.width;
			this.height = params.height;
			this.numberOfFields = this.width * this.height;
		} else if (params.matrix) {
			this.width = params.matrix[0].length;
			this.height = params.matrix.length;
			this.numberOfFields = this.width * this.height;
		}

		// Create and generate the matrix
		this.gridNodes = this.buildGridWithNodes(
			params.matrix || undefined,
			this.width,
			this.height
		);
	}

	private buildGridWithNodes(
		matrix: number[][],
		width: number,
		height: number
	) {
		const newGrid: Node[][] = [];
		let id: number = 0;

		for (let y = 0; y < height; y++) {
			newGrid[y] = [];
			for (let x = 0; x < width; x++) {
				newGrid[y][x] = new Node({ id, position: { x, y } });
				id++;
			}
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (matrix[y][x]) {
					newGrid[y][x].setIsWalkable(false);
				} else {
					newGrid[y][x].setIsWalkable(true);
				}
			}
		}

		return newGrid;
	}

	/**
	 * Return a specific node.
	 * @param position [position on the grid]
	 */
	public getNodeAt(position: Coordinates): Node {
		return this.gridNodes[position.y][position.x];
	}

	/**
	 * Check if specific node walkable.
	 * @param position [position on the grid]
	 */
	public isWalkableAt(position: Coordinates): boolean {
		return this.gridNodes[position.y][position.x].getIsWalkable();
	}

	/**
	 * Check if specific node is on the grid.
	 * @param position [position on the grid]
	 */
	private isOnTheGrid(position: Coordinates): boolean {
		return (
			position.x >= 0 &&
			position.x < this.width &&
			position.y >= 0 &&
			position.y < this.height
		);
	}

	/**
	 * Get surrounding nodes.
	 * @param currentXPos [x-position on the grid]
	 * @param currentYPos [y-position on the grid]
	 * @param diagnonalMovementAllowed [is diagnonal movement allowed?]
	 */
	public getSurroundingNodes(
		currentPosition: Coordinates,
		diagnonalMovementAllowed: boolean
	): Node[] {
		const surroundingNodes: Node[] = [];

		for (var y = currentPosition.y - 1; y <= currentPosition.y + 1; y++) {
			for (var x = currentPosition.x - 1; x <= currentPosition.x + 1; x++) {
				if (this.isOnTheGrid({ x, y })) {
					if (this.isWalkableAt({ x, y })) {
						if (diagnonalMovementAllowed) {
							surroundingNodes.push(this.getNodeAt({ x, y }));
						} else {
							if (x == currentPosition.x || y == currentPosition.y) {
								surroundingNodes.push(this.getNodeAt({ x, y }));
							}
						}
					} else {
						continue;
					}
				} else {
					continue;
				}
			}
		}

		return surroundingNodes;
	}

	public setGrid(newGrid: Node[][]): void {
		this.gridNodes = newGrid;
	}

	/**
	 * Reset the grid
	 */
	public resetGrid(): void {
		for (let y = 0; y < this.gridNodes.length; y++) {
			for (let x = 0; x < this.gridNodes[y].length; x++) {
				this.gridNodes[y][x].setIsOnClosedList(false);
				this.gridNodes[y][x].setIsOnOpenList(false);
				this.gridNodes[y][x].setParent(undefined);
				this.gridNodes[y][x].setFGHValuesToZero();
			}
		}
	}

	/**
	 * Get all the nodes of the grid.
	 */
	public getGridNodes(): Node[][] {
		return this.gridNodes;
	}

	/**
	 * Get a clone of the grid
	 */
	public clone(): Node[][] {
		const cloneGrid: Node[][] = [];
		let id: number = 0;

		for (let y = 0; y < this.height; y++) {
			cloneGrid[y] = [];
			for (let x = 0; x < this.width; x++) {
				cloneGrid[y][x] = new Node({
					id: id,
					position: { x: x, y: y },
					walkable: this.gridNodes[y][x].getIsWalkable(),
				});

				id++;
			}
		}
		return cloneGrid;
	}
}
