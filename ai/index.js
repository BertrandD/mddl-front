import 'babel-polyfill';
import logger from './logger'

logger.log('\x1Bc');

logger.log("********************");
logger.log("   Middlewar AI     ");
logger.log("********************");

import Game from './Game'

const store = Game.store;

const state = store.getState();
if (!state.user.token) {
    logger.error("No user token");
    process.exit();
}

Game.run()