const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializaciones
const app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
const routes = require('./routes/index');
app.use('/', routes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
    console.log(`Servidor Stripe iniciado en el puerto ${PORT}`);
});
