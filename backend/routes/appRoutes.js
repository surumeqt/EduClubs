import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const VIEWS_PATH = path.join(PROJECT_ROOT, 'view');

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard.html'));
});

export default router;
