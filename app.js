/**
 *Cargamos los modulos de node para poder utilizarlos en nuestra biblioteca.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var app = express();

/*
 * Se configura a continuación los diferentes directorios que vamos a utilizar
 * Ademas de establecerse el puerto por el que vamos a escuchar.
 */
app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
 * Se accede al nombre del libro con get y con post publicamos la nueva opinion
 * @param {type} param1
 * @param {type} param2
 */
app.get('/', routes.index);
app.get('/libro/:name', routes.libro);
app.post('/libro/add-fact', routes.addFact);

/*
 * Se muestra el puerto que esta siendo escuchado cuando se realizar la conexion.
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Este es el puerto que esta siendo escuchado:\n " + app.get('port'));
});
