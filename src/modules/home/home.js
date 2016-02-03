import Routes from '../../core/routes';
import IndexController from './IndexController';

var app = new Routes;

app.map('/', IndexController);
