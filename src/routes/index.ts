import express from 'express';
import newsletterRoutes from './newsletter.route';

const router = express.Router();

router.use('/api/newsletter', newsletterRoutes);

export default router;