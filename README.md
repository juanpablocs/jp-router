# Simple Router Controller JS

demo básica de como manejar routers y controllers en javascript utilizando ES6.

##Install:

```
npm install jp-router --save
```


##Ejemplos:

Básico:

```js
import Routes from 'jp-router';

var app = new Routes({location:window.location.pathname});

app.map('/', function(){
  console.log('index home');
});

```

Ejemplo controller:

```js
import Routes from 'jp-router';
import UserController from './controllers/user';

var app = new Routes({location:window.location.pathname});

app.map('/user/:username/', UserController);

```

tambien acepta expresiones regulares:

```js
app.map('/id/[0-9]+/', MyIdController);
```

Ejemplo de un blog:
```js
app.map('/blog/:title/[0-9]+/', MyBlogController);

// in controller
class MyBlogController{
  constructor(title, id){
    this.title = title;
    this.id = id;
  }
}

```


work in progress..