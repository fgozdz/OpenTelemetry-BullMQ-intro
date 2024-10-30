import express from 'express';
import controllers from '../controllers';

const router = express.Router();

const {newsletterController} = controllers;

router.post('/subscribe', newsletterController.subscribeToNewsletter);

router.post('/unsubscribe', newsletterController.unsubcribeFromNewsletter);

export default router;