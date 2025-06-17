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

router.get('/projects', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard.html'));
});
router.get('/commissions', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard.html'));
});
router.get('/messages', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard.html'));
});
router.get('/profile', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard.html'));
});

router.get('/content/dashboard', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'dashboard_content.html'));
});

router.get('/content/projects', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'projects.html'));
});
router.get('/content/commissions', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'commissions.html'));
});
router.get('/content/messages', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'messages.html'));
});
router.get('/content/profile', (req, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'profile.html'));
});

router.get('/api/data', (req, res) => {
    res.json({ message: 'Data from your API!' });
});


export default router;
