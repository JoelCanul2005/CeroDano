const express = require('express');
const router = express.Router();

// Importar el controlador
const mainController = require('../controllers/mainController');

// Ruta principal
router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/centro-ayuda', (req, res) => {
    res.render('centros'); 
});

router.get('/ayuda', mainController.obtenerNoticias);

router.get('/ayuda-hombres', (req, res) => {
    res.render('ayudahombre'); 
});

router.get('/ayuda-mujeres', (req, res) => {
    res.render('ayudamujer'); 
});

router.get('/ayuda-otros', (req, res) => {
    res.render('ayudaotros'); 
});

// Ruta para la página de blog
router.get('/blog', mainController.obtenerPublicacionesAprobadas);

// Ruta para obtener publicaciones aprobadas (puedes eliminar esta si es redundante)
router.get('/publicaciones-aprobadas', mainController.obtenerPublicacionesAprobadas);

// Ruta para mostrar el formulario de creación de publicación
router.get('/crear-publicacion', mainController.mostrarFormularioCreacion);

// Ruta para procesar el formulario de creación de publicación
router.post('/crear-publicacion', mainController.crearPublicacion);

router.get('/reportes', mainController.mostrarFormularioCreacionReporte);
router.post('/crear-reporte', mainController.crearReporte);

// Página de inicio de sesión
router.get('/admin/login', mainController.getLogin);
router.post('/admin/login', mainController.postLogin);

// Página principal del panel administrativo
router.get('/admin', mainController.getAdminPanel);

// Rutas para blogs
router.get('/admin/blogs', mainController.getBlogs);
router.post('/admin/blogs/add', mainController.addBlog);
router.post('/admin/blogs/update', mainController.updateBlog);
router.post('/admin/blogs/delete', mainController.deleteBlog);

// Rutas para reportes
router.get('/admin/reportes', mainController.getReportes);
router.post('/admin/reportes/add', mainController.addReporte);
router.post('/admin/reportes/update', mainController.updateReporte);

// Rutas para noticias
router.get('/admin/noticias', mainController.getNoticias);
router.post('/admin/noticias/add', mainController.addNoticia);
router.post('/admin/noticias/update', mainController.updateNoticia);
router.post('/admin/noticias/delete', mainController.deleteNoticia);
router.get('/admin/noticias/edit/:id', mainController.mostrarFormularioEdicion);


module.exports = router;
