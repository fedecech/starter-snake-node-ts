import { Router, Request, Response } from 'express';
import { BattleSnakeInfo } from '../interfaces/battlesnakeInfo';
const router = Router();

// route used to get info about the snakes before the game starts
router.get('/', (_: Request, res: Response) => {
	const battlesnakeInfo: BattleSnakeInfo = {
		apiversion: '1',
		author: 'fedecech',
		color: '#ffcc00',
		head: 'default',
		tail: 'default',
	};
	res.status(200).json(battlesnakeInfo);
});

export { router as baseRouter };
