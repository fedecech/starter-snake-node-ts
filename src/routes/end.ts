import { Router } from 'express';

const router = Router();

router.get('/end', (_, res) => {
	// const gameData = req.body;

	console.log('END');
	res.status(200).send('ok');
});

export { router as endRouter };
