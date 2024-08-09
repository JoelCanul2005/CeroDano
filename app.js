const express = require('express');
const path = require('path');

const app = express();
const port = 3000;



// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
// Middleware para parsear JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y usar las rutas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
