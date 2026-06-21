import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { hashPassword } from '../utils/password.js';
import { asyncHandler } from '../middleware/error.js';

const router = Router();

router.post('/demo', asyncHandler(async (req, res) => {
  // Wipe existing data
  await db.delete(schema.payments);
  await db.delete(schema.fees);
  await db.delete(schema.doubtReplies);
  await db.delete(schema.doubts);
  await db.delete(schema.assignmentSubmissions);
  await db.delete(schema.assignments);
  await db.delete(schema.testResults);
  await db.delete(schema.questions);
  await db.delete(schema.tests);
  await db.delete(schema.liveClasses);
  await db.delete(schema.materials);
  await db.delete(schema.batchStudents);
  await db.delete(schema.batchTeachers);
  await db.delete(schema.batches);
  await db.delete(schema.subjects);
  await db.delete(schema.courses);
  await db.delete(schema.studentProfiles);
  await db.delete(schema.teacherProfiles);
  await db.delete(schema.notifications);
  await db.delete(schema.users);

  const adminPass = await hashPassword('Admin@123');
  const teacherPass = await hashPassword('Teacher@123');
  const studentPass = await hashPassword('Student@123');

  // Admin
  const [admin] = await db.insert(schema.users).values({
    name: 'Super Admin', email: 'admin@demo.com', phone: '9000000001', password: adminPass, role: 'admin',
  }).returning();

  // Teachers
  const [t1, t2, t3] = await db.insert(schema.users).values([
    { name: 'Prof. Ramesh Sharma', email: 'teacher@demo.com', phone: '9000000002', password: teacherPass, role: 'teacher' },
    { name: 'Dr. Priya Verma', email: 'teacher2@demo.com', phone: '9000000003', password: teacherPass, role: 'teacher' },
    { name: 'Prof. Anil Gupta', email: 'teacher3@demo.com', phone: '9000000004', password: teacherPass, role: 'teacher' },
  ]).returning();

  await db.insert(schema.teacherProfiles).values([
    { userId: t1.id, qualification: 'M.Sc Mathematics', experience: 12, specialization: 'Mathematics' },
    { userId: t2.id, qualification: 'Ph.D Physics', experience: 8, specialization: 'Physics' },
    { userId: t3.id, qualification: 'M.Sc Chemistry', experience: 6, specialization: 'Chemistry' },
  ]);

  // Students
  const [s1, s2, s3, s4, s5] = await db.insert(schema.users).values([
    { name: 'Rahul Sharma', email: 'student@demo.com', phone: '9000000010', password: studentPass, role: 'student' },
    { name: 'Priya Singh', email: 'student2@demo.com', phone: '9000000011', password: studentPass, role: 'student' },
    { name: 'Amit Kumar', email: 'student3@demo.com', phone: '9000000012', password: studentPass, role: 'student' },
    { name: 'Sneha Patel', email: 'student4@demo.com', phone: '9000000013', password: studentPass, role: 'student' },
    { name: 'Rohan Mehta', email: 'student5@demo.com', phone: '9000000014', password: studentPass, role: 'student' },
  ]).returning();

  // Courses
  const [jee, neet] = await db.insert(schema.courses).values([
    { name: 'JEE Advanced 2025', description: 'Comprehensive preparation for JEE Advanced with focus on Physics, Chemistry, and Mathematics', classLevel: 'Class 11-12', duration: 24, fee: '45000' },
    { name: 'NEET 2025', description: 'Complete NEET preparation covering Biology, Physics and Chemistry', classLevel: 'Class 11-12', duration: 24, fee: '40000' },
  ]).returning();

  // Subjects
  const [math, phy, chem] = await db.insert(schema.subjects).values([
    { courseId: jee.id, name: 'Mathematics', order: 1 },
    { courseId: jee.id, name: 'Physics', order: 2 },
    { courseId: jee.id, name: 'Chemistry', order: 3 },
  ]).returning();

  // Update student profiles
  await db.insert(schema.studentProfiles).values([
    { userId: s1.id, parentName: 'Vijay Sharma', parentPhone: '9001000001', courseId: jee.id, enrollmentDate: new Date('2024-06-01') },
    { userId: s2.id, parentName: 'Ravi Singh', parentPhone: '9001000002', courseId: jee.id, enrollmentDate: new Date('2024-06-05') },
    { userId: s3.id, parentName: 'Suresh Kumar', parentPhone: '9001000003', courseId: neet.id, enrollmentDate: new Date('2024-06-10') },
    { userId: s4.id, parentName: 'Mohan Patel', parentPhone: '9001000004', courseId: neet.id, enrollmentDate: new Date('2024-06-12') },
    { userId: s5.id, parentName: 'Arun Mehta', parentPhone: '9001000005', courseId: jee.id, enrollmentDate: new Date('2024-07-01') },
  ]);

  // Batches
  const [batchA, batchB] = await db.insert(schema.batches).values([
    { name: 'JEE 2025 - Batch A', courseId: jee.id, timing: 'Mon/Wed/Fri 10:00 AM', startDate: new Date('2024-06-01'), endDate: new Date('2025-05-31'), description: 'Morning batch for JEE Advanced' },
    { name: 'NEET 2025 - Batch B', courseId: neet.id, timing: 'Tue/Thu/Sat 2:00 PM', startDate: new Date('2024-06-01'), endDate: new Date('2025-05-31'), description: 'Afternoon batch for NEET' },
  ]).returning();

  await db.insert(schema.batchTeachers).values([
    { batchId: batchA.id, teacherId: t1.id },
    { batchId: batchA.id, teacherId: t2.id },
    { batchId: batchB.id, teacherId: t2.id },
    { batchId: batchB.id, teacherId: t3.id },
  ]);

  await db.insert(schema.batchStudents).values([
    { batchId: batchA.id, studentId: s1.id },
    { batchId: batchA.id, studentId: s2.id },
    { batchId: batchA.id, studentId: s5.id },
    { batchId: batchB.id, studentId: s3.id },
    { batchId: batchB.id, studentId: s4.id },
  ]);

  // Materials
  await db.insert(schema.materials).values([
    { title: 'Calculus - Integration Notes', description: 'Comprehensive notes on integration techniques', fileUrl: 'https://example.com/calculus.pdf', fileType: 'pdf', fileName: 'calculus_integration.pdf', fileSize: 2048000, courseId: jee.id, subjectId: math.id, uploadedBy: t1.id },
    { title: 'Newton\'s Laws of Motion', description: 'Detailed study material on Newton\'s laws', fileUrl: 'https://example.com/newton.pdf', fileType: 'pdf', fileName: 'newtons_laws.pdf', fileSize: 1536000, courseId: jee.id, subjectId: phy.id, uploadedBy: t2.id },
    { title: 'Organic Chemistry - Reactions', description: 'Key reactions in organic chemistry', fileUrl: 'https://example.com/organic.pdf', fileType: 'pdf', fileName: 'organic_chem.pdf', fileSize: 3072000, courseId: jee.id, subjectId: chem.id, uploadedBy: t3.id },
  ]);

  // Live Classes
  const now = new Date();
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const dayAfter = new Date(now); dayAfter.setDate(now.getDate() + 2);

  await db.insert(schema.liveClasses).values([
    { title: 'Mathematics - Calculus Integration', teacherId: t1.id, batchId: batchA.id, courseId: jee.id, meetingLink: 'https://meet.google.com/abc-defg-hij', scheduledDate: tomorrow, scheduledTime: '10:00 AM', duration: 90, status: 'scheduled' },
    { title: 'Physics - Mechanics and Motion', teacherId: t2.id, batchId: batchA.id, courseId: jee.id, meetingLink: 'https://meet.google.com/klm-nopq-rst', scheduledDate: tomorrow, scheduledTime: '2:00 PM', duration: 90, status: 'scheduled' },
    { title: 'Chemistry - Organic Reactions', teacherId: t3.id, batchId: batchB.id, courseId: neet.id, meetingLink: 'https://meet.google.com/uvw-xyza-bcd', scheduledDate: dayAfter, scheduledTime: '9:00 AM', duration: 90, status: 'scheduled' },
  ]);

  // Tests
  const [test1, test2] = await db.insert(schema.tests).values([
    { title: 'Mathematics Unit Test 1 - Calculus', batchId: batchA.id, courseId: jee.id, subjectId: math.id, teacherId: t1.id, duration: 60, totalMarks: 100, passingMarks: 40, status: 'published', startDate: new Date('2024-11-01'), endDate: new Date('2025-12-31') },
    { title: 'Physics Chapter Test - Mechanics', batchId: batchA.id, courseId: jee.id, subjectId: phy.id, teacherId: t2.id, duration: 45, totalMarks: 50, passingMarks: 20, status: 'published', startDate: new Date('2024-11-10'), endDate: new Date('2025-12-31') },
  ]).returning();

  await db.insert(schema.questions).values([
    { testId: test1.id, questionText: 'What is the integral of x²?', questionType: 'mcq', marks: 4, options: ['x³ + C', 'x³/3 + C', '2x + C', 'x²/2 + C'], correctAnswer: 'x³/3 + C', order: 1 },
    { testId: test1.id, questionText: 'What is the derivative of sin(x)?', questionType: 'mcq', marks: 4, options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correctAnswer: 'cos(x)', order: 2 },
    { testId: test2.id, questionText: 'Newton\'s first law is also called?', questionType: 'mcq', marks: 2, options: ['Law of Inertia', 'Law of Force', 'Law of Motion', 'Law of Action'], correctAnswer: 'Law of Inertia', order: 1 },
  ]);

  // Test Results
  await db.insert(schema.testResults).values([
    { testId: test1.id, studentId: s1.id, marksObtained: '92', percentage: '92', status: 'graded', remarks: 'Excellent work!', submittedAt: new Date('2024-11-02') },
    { testId: test1.id, studentId: s2.id, marksObtained: '78', percentage: '78', status: 'graded', remarks: 'Good performance', submittedAt: new Date('2024-11-02') },
    { testId: test2.id, studentId: s1.id, marksObtained: '42', percentage: '84', status: 'graded', remarks: 'Well done', submittedAt: new Date('2024-11-11') },
  ]);

  // Assignments
  const nextWeek = new Date(now); nextWeek.setDate(now.getDate() + 7);
  const [asgn1] = await db.insert(schema.assignments).values([
    { title: 'Integration Practice Problems', description: 'Solve 20 integration problems from the exercise sheet. Show all steps clearly.', batchId: batchA.id, courseId: jee.id, subjectId: math.id, teacherId: t1.id, dueDate: nextWeek, totalMarks: 20 },
    { title: 'Newton\'s Laws Application', description: 'Apply Newton\'s laws to solve real-world problems. Write detailed explanations.', batchId: batchA.id, courseId: jee.id, subjectId: phy.id, teacherId: t2.id, dueDate: nextWeek, totalMarks: 15 },
  ]).returning();

  // Doubts
  const [d1, d2] = await db.insert(schema.doubts).values([
    { studentId: s1.id, subjectId: math.id, question: 'How do I solve integration by parts when the function is a product of polynomial and exponential?', status: 'answered' },
    { studentId: s2.id, subjectId: phy.id, question: "What is the difference between Newton's 2nd and 3rd law in practical applications?", status: 'open' },
  ]).returning();

  await db.insert(schema.doubtReplies).values([
    { doubtId: d1.id, teacherId: t1.id, reply: 'Use the LIATE rule: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential. For polynomial × exponential, let u = polynomial and dv = e^x dx. Then integrate repeatedly.' },
  ]);

  // Fees
  const [fee1, fee2] = await db.insert(schema.fees).values([
    { studentId: s1.id, courseId: jee.id, totalAmount: '45000', discount: '5000', finalAmount: '40000', dueDate: new Date('2025-03-31') },
    { studentId: s2.id, courseId: jee.id, totalAmount: '45000', discount: '0', finalAmount: '45000', dueDate: new Date('2025-01-31') },
    { studentId: s3.id, courseId: neet.id, totalAmount: '40000', discount: '2000', finalAmount: '38000', dueDate: new Date('2025-02-28') },
  ]).returning();

  await db.insert(schema.payments).values([
    { feeId: fee1.id, studentId: s1.id, amount: '20000', paymentMode: 'upi', transactionId: 'TXN001234', receiptNumber: 'RCP-001', status: 'paid', recordedBy: admin.id },
    { feeId: fee2.id, studentId: s2.id, amount: '45000', paymentMode: 'cash', receiptNumber: 'RCP-002', status: 'paid', recordedBy: admin.id },
  ]);

  res.json({
    success: true,
    message: 'Demo data seeded successfully!',
    credentials: {
      admin: { email: 'admin@demo.com', password: 'Admin@123' },
      teacher: { email: 'teacher@demo.com', password: 'Teacher@123' },
      student: { email: 'student@demo.com', password: 'Student@123' },
    },
  });
}));

export default router;
