import Routes from './core/routes';
import IndexController from './modules/home/IndexController';

var app = new Routes;

app.map('/', IndexController);
