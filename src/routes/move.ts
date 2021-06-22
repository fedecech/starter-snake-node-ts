import { Router } from 'express';

const router = Router();

router.post('/move', (req, res) => {
	const gameData = req.body;
	console.log(gameData);

	const possibleMoves = ['up', 'down', 'left', 'right'];
	const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

	console.log('MOVE: ' + move);
	res.status(200).send({
		move: move,
	});
});

export { router as moveRouter };
