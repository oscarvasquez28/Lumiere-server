import express from 'express';
import cors from 'cors';
//Patrón de Diseño de Módulos (Module Pattern)
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

import {PORT} from './config/config.js'

const app = express();
app.use(cors());
//app.use(express.json()); // Para poder leer JSON en el cuerpo de las peticiones
app.use(express.json({ limit: '10mb' }));  // 10 MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware Pattern
app.use((req, res) => {
    res.status(404).send({ message: `Route ${req.url} not found.` });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
