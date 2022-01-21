import mainView from './views/mainview';
import controlView from './views/controlview';

import GameBrain from './model/gamebrain';
import GameController from './controllers/game-controller';
import StatisticsController from './controllers/statistics-controller';

const brain = new GameBrain();

const game_view = mainView('game');
const statistics_view = mainView('statistics');
const view = mainView('main');

const gameController = new GameController(brain, game_view);
const statisticsController = new StatisticsController(statistics_view);

document.body.append(view);
const ctrl_view = controlView(gameControlClick);

view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e) {
    switch (e.target.id) {
        case 'game':
            if (view.hasChildNodes && view.firstElementChild.nextElementSibling.id !== 'game') view.removeChild(statistics_view);
            view.append(game_view);
            statisticsController.stop();
            gameController.run();
            break;
        case 'statistics':
            if (view.hasChildNodes && view.firstElementChild.nextElementSibling.id !== 'statistics') view.removeChild(game_view);
            view.append(statistics_view);
            gameController.stop();
            statisticsController.run();
            break;
        default:
            break;
    }
}

gameController.run();

window.addEventListener('resize', () => {
    if (gameController.isRunning) gameController.resizeUi();
});
