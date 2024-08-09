const mysql = require('mysql2');
const moment = require('moment-timezone'); // Requerir moment-timezone

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: 57451,
    user: 'root',
    password: 'rsdSCXTsWGewCXwQqvJvUYEBUeYFuVAP',
    database: 'violenciamujer',
    timezone: 'Z'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

const obtenerPublicacionesAprobadas = (req, res) => {
    const query = 'SELECT * FROM blogs WHERE estado = ?';
    
    connection.query(query, ['aprobado'], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }

        res.render('blog', { publicaciones: results });
    });
};

const mostrarFormularioCreacion = (req, res) => {
    res.render('crearPublicacion');
};

const crearPublicacion = (req, res) => {
    const { contenido, genero } = req.body;
    const fecha_publicacion = moment.tz(new Date(), 'America/Merida').format('YYYY-MM-DD HH:mm:ss'); // Fecha y hora con zona horaria
    const estado = 'pendiente';

    const query = 'INSERT INTO blogs (contenido, genero, fecha_publicacion, estado) VALUES (?, ?, ?, ?)';
    const values = [contenido, genero, fecha_publicacion, estado];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al crear la publicación:', err);
            return res.status(500).send('Hubo un problema al crear la publicación');
        }
        res.redirect('/blog');
    });
};

const mostrarFormularioCreacionReporte = (req, res) => {
    res.render('crearReporte');
};

const crearReporte = (req, res) => {
    const { contenido_reporte } = req.body;
    const fecha_reporte = moment.tz(new Date(), 'America/Merida').format('YYYY-MM-DD HH:mm:ss'); // Fecha y hora con zona horaria
    const estado_reporte = 'pendiente';

    const query = 'INSERT INTO reportes (contenido_reporte, fecha_reporte, estado_reporte) VALUES (?, ?, ?)';
    const values = [contenido_reporte, fecha_reporte, estado_reporte];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al crear el reporte:', err);
            return res.status(500).send('Hubo un problema al crear el reporte');
        }
        res.redirect('/reportes');
    });
};

const obtenerNoticias = (req, res) => {
    const query = 'SELECT * FROM noticias ORDER BY fecha_publicacion DESC';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las noticias:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }

        res.render('ayuda', { noticias: results });
    });
};

const getLogin = (req, res) => {
    res.render('login');
};

// Manejador de inicio de sesión en Express
const postLogin = (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios_administrativos WHERE correo = ? AND contrasena = ?';

    connection.query(query, [correo, contrasena], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (results.length > 0) {
            // Enviar respuesta positiva si las credenciales son correctas
            res.json({ success: true });
        } else {
            // Enviar respuesta negativa si las credenciales son incorrectas
            res.json({ success: false, message: 'Credenciales inválidas' });
        }
    });
};


const getAdminPanel = (req, res) => {
    res.render('admin');
};

const getBlogs = (req, res) => {
    const query = 'SELECT * FROM blogs';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los blogs:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }
        res.render('blogs', { blogs: results });
    });
};

const addBlog = (req, res) => {
    const { contenido, genero } = req.body;
    const fecha_publicacion = moment.tz(new Date(), 'America/Merida').format('YYYY-MM-DD HH:mm:ss'); // Fecha y hora con zona horaria
    const estado = 'pendiente';

    const query = 'INSERT INTO blogs (contenido, genero, fecha_publicacion, estado) VALUES (?, ?, ?, ?)';
    const values = [contenido, genero, fecha_publicacion, estado];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error al crear la publicación:', err);
            return res.status(500).send('Hubo un problema al crear la publicación');
        }
        res.redirect('/admin/blogs');
    });
};

const updateBlog = (req, res) => {
    const { id_blog, estado } = req.body;
    const query = 'UPDATE blogs SET estado = ? WHERE id_blog = ?';
    connection.query(query, [estado, id_blog], (err) => {
        if (err) {
            console.error('Error al actualizar el blog:', err);
            return res.status(500).send('Hubo un problema al actualizar el blog');
        }
        res.redirect('/admin/blogs');
    });
};

const deleteBlog = (req, res) => {
    const { id_blog } = req.body;
    const query = 'DELETE FROM blogs WHERE id_blog = ?';
    connection.query(query, [id_blog], (err) => {
        if (err) {
            console.error('Error al eliminar el blog:', err);
            return res.status(500).send('Hubo un problema al eliminar el blog');
        }
        res.redirect('/admin/blogs');
    });
};

const getReportes = (req, res) => {
    const query = 'SELECT * FROM reportes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los reportes:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }
        res.render('reportes', { reportes: results });
    });
};

const addReporte = (req, res) => {
    const { contenido_reporte } = req.body;
    const fecha_reporte = moment.tz(new Date(), 'America/Merida').format('YYYY-MM-DD HH:mm:ss'); // Fecha y hora con zona horaria
    const estado_reporte = 'pendiente';

    const query = 'INSERT INTO reportes (contenido_reporte, fecha_reporte, estado_reporte) VALUES (?, ?, ?)';
    const values = [contenido_reporte, fecha_reporte, estado_reporte];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error al crear el reporte:', err);
            return res.status(500).send('Hubo un problema al crear el reporte');
        }
        res.redirect('/admin/reportes');
    });
};

const updateReporte = (req, res) => {
    const { id_reporte, estado_reporte } = req.body;
    const query = 'UPDATE reportes SET estado_reporte = ? WHERE id_reporte = ?';
    connection.query(query, [estado_reporte, id_reporte], (err) => {
        if (err) {
            console.error('Error al actualizar el reporte:', err);
            return res.status(500).send('Hubo un problema al actualizar el reporte');
        }
        res.redirect('/admin/reportes');
    });
};

const getNoticias = (req, res) => {
    const query = 'SELECT * FROM noticias';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las noticias:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }
        res.render('noticias', { noticias: results });
    });
};

const addNoticia = (req, res) => {
    const { titulo, descripcion, url_imagen, url_mas_info } = req.body;
    const query = 'INSERT INTO noticias (titulo, descripcion, url_imagen, url_mas_info, fecha_publicacion) VALUES (?, ?, ?, ?, NOW())';
    const values = [titulo, descripcion, url_imagen, url_mas_info];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error al crear la noticia:', err);
            return res.status(500).send('Hubo un problema al crear la noticia');
        }
        res.redirect('/admin/noticias');
    });
};

const updateNoticia = (req, res) => {
    const { id, titulo, descripcion, url_imagen, url_mas_info } = req.body;
    const query = 'UPDATE noticias SET titulo = ?, descripcion = ?, url_imagen = ?, url_mas_info = ? WHERE id = ?';
    const values = [titulo, descripcion, url_imagen, url_mas_info, id];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error al actualizar la noticia:', err);
            return res.status(500).send('Hubo un problema al actualizar la noticia');
        }
        res.redirect('/admin/noticias');
    });
};

const mostrarFormularioEdicion = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM noticias WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener la noticia:', err);
            return res.status(500).send('Error al obtener la noticia');
        }
        res.render('editNoticia', { noticiaedit: results[0] });
    });
};

const deleteNoticia = (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM noticias WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar la noticia:', err);
            return res.status(500).send('Hubo un problema al eliminar la noticia');
        }
        res.redirect('/admin/noticias');
    });
};


module.exports = {
    obtenerPublicacionesAprobadas,
    mostrarFormularioCreacion,
    crearPublicacion,
    mostrarFormularioCreacionReporte,
    crearReporte,
    obtenerNoticias,
    getLogin,
    postLogin,
    getAdminPanel,
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    getReportes,
    addReporte,
    updateReporte,
    getNoticias,
    addNoticia,
    updateNoticia,
    deleteNoticia,
    mostrarFormularioEdicion
};
