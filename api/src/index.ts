import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { verifyDatabaseConnection } from './lib/prisma.js';
import { bullBoardRouter } from './lib/bullboard.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/admin/queues', bullBoardRouter);
app.use('/api', routes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const start = async () => {
    try {
        await verifyDatabaseConnection();
        console.log('Conexão com banco de dados estabelecida');

        app.listen(PORT, () => {
            console.log(`Api rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar API:', error);
        process.exit(1);
    }
};

start();