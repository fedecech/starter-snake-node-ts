import { Router, Request, Response } from 'express';
import { GameData } from '../interfaces/gameData';

const router = Router();

router.post('/end', (req: Request, res: Response) => {
	const gameData = req.body as GameData;

	console.log('/end', gameData);
	res.status(200).send('ok');
});

export { router as endRouter };
