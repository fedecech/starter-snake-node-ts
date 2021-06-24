import { Router, Request, Response } from 'express';
import { GameData } from '../interfaces/gameData';

const router = Router();

router.post('/start', (req: Request, res: Response) => {
	const gameData = req.body as GameData;

	console.log('/start', gameData);

	res.status(200).send('ok');
});

export { router as startRouter };
