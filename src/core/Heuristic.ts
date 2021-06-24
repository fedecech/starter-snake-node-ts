import { Coordinates } from './../interfaces/gameData';

export type HeuristicFN = 'Manhatten' | 'Euclidean' | 'Chebyshev' | 'Octile';

export class Heuristic {
	public static calculateHeuristic(
		hFN: HeuristicFN,
		pos0: Coordinates,
		pos1: Coordinates,
		weight?: number
	) {
		const dx = Math.abs(pos1.x - pos0.x);
		const dy = Math.abs(pos1.y - pos0.y);
		switch (hFN) {
			case 'Manhatten':
				return this.manhatten(dx, dy, weight);
			case 'Euclidean':
				return this.euclidean(dx, dy, weight);
			case 'Octile':
				return this.octile(dx, dy, weight);
			case 'Chebyshev':
				return this.chebyshev(dx, dy, weight);
		}
	}

	private static manhatten(dx: number, dy: number, weight?: number) {
		return (dx + dy) * weight;
	}

	private static euclidean(dx: number, dy: number, weight?: number) {
		return Math.sqrt(dx * dx + dy * dy) * weight;
	}

	private static octile(dx: number, dy: number, weight?: number) {
		return (dx + dy - 0.58 * Math.min(dx, dy)) * weight;
	}

	private static chebyshev(dx: number, dy: number, weight?: number) {
		return Math.max(dx, dy) * weight;
	}
}
