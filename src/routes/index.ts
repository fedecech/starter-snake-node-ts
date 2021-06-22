import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	console.log(req);
	var battlesnakeInfo = {
		apiversion: '1',
		author: 'fedecech',
		color: '#ffcc00',
		head: 'default',
		tail: 'default',
	};
	res.status(200).json(battlesnakeInfo);
});

export { router as baseRouter };
