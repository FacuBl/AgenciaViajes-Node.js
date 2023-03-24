import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))
//Definir puerto 
const port = process.env.PORT || 4000;
//Habilitar Pug
app.set('view engine', 'pug');
//Obtener el a;o actual
app.use((req, res, next) => {
    const year = new Date();

    res.locals.Actualyear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes'
    return next(); // se coloca next para q pase al siguiente middleware ya q es en pila
});

//Agregar body parse para leer datos del formulario
app.use(express.urlencoded({extended:true}))
//Definir la carpeta publica
app.use(express.static('public'))
//Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`);
})