import { Router } from 'express';

const router = Router();

router.post('/start', (_, res) => {
	// const gameData = req.body;
	console.log('START');
	res.status(200).send('ok');
});

export { router as startRouter };
