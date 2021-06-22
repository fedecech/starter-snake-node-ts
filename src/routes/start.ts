import { Router } from 'express';

const router = Router();

router.get('/start', (req, res) => {
	const gameData = req.body;
	console.log(gameData);
	console.log('START');
	res.status(200).send('ok');
});

export { router as startRouter };
