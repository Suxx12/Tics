const express = require('express');
const http = require('http');
const app = express();
const port = 3000;
const server = http.createServer(app); // Crear el servidor con la aplicación Express

const session = require('express-session');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const socketIo = require('socket.io');
const io = socketIo(server);

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/public', express.static('public'));

// Configuración de la sesión
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } // Cookie de sesión válida por 1 minuto
}));

// Configuración de Handlebars
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('addOne', function(index) {
    return index + 1;
});
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Conexión a la base de datos MongoDB
const url = 'mongodb://localhost:27017/';
const dbName = 'databasePoolPatrol';

// Emitir los datos del sensor a través de Socket.IO
io.on('connection', function(socket) {
  console.log('Un cliente se ha conectado');

  // Simplemente retransmite los datos recibidos a todos los clientes conectados
  socket.on('datosSensor', function(datos) {
      console.log('Datos del sensor recibidos:', datos);
      io.emit('datosSensor', datos); // Emitir los datos a todos los clientes conectados
  });
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para agregar un nuevo usuario
app.post('/agregarusuario', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.error('Error al conectar con la base de datos:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    const dbo = db.db(dbName);
    const nuevoUsuario = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      contrasena: req.body.contrasena
    };

    dbo.collection('usuarios').findOne({ correo: req.body.correo }, function (err, usuarioExistente) {
      if (err) {
        console.error('Error al buscar usuario:', err);
        res.status(500).send('Error del servidor');
        db.close();
        return;
      }

      if (usuarioExistente) {
        res.redirect('/login');
        db.close();
      } else {
        dbo.collection('usuarios').insertOne(nuevoUsuario, function (err, result) {
          if (err) {
            console.error('Error al insertar usuario:', err);
            res.status(500).send('Error del servidor');
            db.close();
            return;
          }
          res.redirect('/index');
          db.close();
        });
      }
    });
  });
});

// Ruta para verificar los datos de inicio de sesión
app.post('/verificardatos', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection('usuarios').findOne({ correo: req.body.correo, contrasena: req.body.contrasena }, function (err, result) {
      if (err) throw err;
      if (result) {
        req.session.nombre = result.nombre;
        res.redirect('/index'); // Redirigir a la página de inicio después de iniciar sesión
      } else {
        res.render('login', { mensaje: 'Credenciales incorrectas' }); // Renderizar la página de inicio de sesión con un mensaje de error
      }

      db.close();
    });
  });
});

// Ruta para mostrar el índice sin autenticación
app.get('/index', (req, res) => {
  if (req.session.nombre) {
    res.render('index', { usuario: req.session.nombre });
  } else {
    res.redirect('/login'); // Redirigir a login si no hay sesión activa
  }
});

// Ruta para obtener todos los datos de la base de datos
app.get('/findAllData', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection("usuarios").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

// Ruta para eliminar todos los datos de la base de datos
app.delete('/deleteAllData', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection("usuarios").deleteMany({}, function(err, result) {
      if (err) throw err;
      res.send(`Se han eliminado ${result.deletedCount} documentos`);
      db.close();
    });
  });
});

// Configurar ruta para manejar solicitudes GET a /login
app.get('/login', (req, res) => {
  res.render('login'); // Renderizar la página de inicio de sesión
});

// Configurar ruta para manejar solicitudes GET a /register
app.get('/register', (req, res) => {
  res.render('register'); // Renderizar la página de registro
});

// Configurar una ruta de redireccionamiento para otras URLs no válidas
app.get('*', (req, res) => {
  res.redirect('/'); // Redirigir a la página de inicio si la URL no es válida
});

app.post('/api/datos', (req, res) => {
  const datosSensores = req.body;
  const usuarioActual = req.session.nombre; // Obtener el usuario actual desde la sesión

  // Guardar los datos de los sensores en la base de datos junto con el usuario actual
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.error('Error al conectar con la base de datos:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    const dbo = db.db(dbName);
    const datosAguardar = { usuario: usuarioActual, datosSensores: datosSensores };
    dbo.collection('datosSensores').insertOne(datosAguardar, function (err, result) {
      if (err) {
        console.error('Error al insertar datos de sensores:', err);
        res.status(500).send('Error del servidor');
        db.close();
        return;
      }
      // Emitir los datos de los sensores a través de Socket.IO
      io.emit('datosSensor', datosSensores);
      
      res.send('Datos de sensores guardados correctamente');
      db.close();
    });
  });
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en http://34.196.28.143:${port}`);
});
