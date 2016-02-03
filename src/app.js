import Routes from './core/routes';
import UserController from './controllers/user';

var app = new Routes;

app.map('/', function(){
  console.log('index home');
  document.getElementById('test').innerHTML = 'router map home /';
});

app.map('/user/:user/', UserController);
