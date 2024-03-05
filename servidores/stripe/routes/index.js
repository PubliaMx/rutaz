const express = require('express');
const router = express.Router();

// Definir tus rutas aquí
router.get('/', (req, res) => {
  res.send('¡Hola desde la ruta principal!');
});

// Exportar el router
module.exports = router;
