import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
app.use(cors());
app.use(express.json()); // Para poder leer JSON en el cuerpo de las peticiones

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(8081, () => {
    console.log('Server running on port 8081');
});
