import { Router } from 'express';
import authRoutes from './auth.js';
import adminRoutes from './admin.js';
import teacherRoutes from './teacher.js';
import studentRoutes from './student.js';
import seedRoutes from './seed.js';
import uploadRoutes from './upload.js';
import notificationRoutes from './notifications.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/seed', seedRoutes);
router.use('/upload', uploadRoutes);
router.use('/notifications', notificationRoutes);

export default router;
