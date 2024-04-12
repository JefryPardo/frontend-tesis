const express = require('express');
const path = require('path');

const app = express();

// Define la carpeta de distribución de tu aplicación Angular
const angularDistFolder = path.join(__dirname, 'dist', 'frontend-tesis');

// Servir archivos estáticos desde la carpeta de distribución
app.use(express.static(angularDistFolder));

// Ruta de inicio: sirve el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(angularDistFolder, 'index.html'));
});

// Puerto de escucha del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});