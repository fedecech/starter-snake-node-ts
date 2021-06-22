import { Router, Request, Response} from 'express';
import {GameData} from '../entities/gameData';

const router = Router();

router.post('/move', (req: Request, res: Response) => {
	const gameData = req.body as GameData;

	console.log("/move", gameData)
	const possibleMoves = ['up', 'down', 'left', 'right'];
	const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

	res.status(200).send({
		move: move,
	});
});

export { router as moveRouter };
