// Course and Academic Types
export interface Course {
  id: string;
  name: string;
  description: string;
  duration: number; // in months
  fee: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  courseId: string;
  name: string;
  description?: string;
  order: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  order: number;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  teacherIds: string[];
  studentIds: string[];
  timing: string;
  status: 'active' | 'inactive' | 'completed';
  startDate: string;
  endDate?: string;
  description?: string;
}

// Material Types
export interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  cloudinaryId: string;
  fileType: 'pdf' | 'image' | 'video' | 'document';
  courseId: string;
  subjectId: string;
  chapterId?: string;
  uploadedBy: string;
  uploadedAt: string;
  visibility: 'public' | 'batch' | 'private';
  size: number;
}

// Live Class Types
export interface LiveClass {
  id: string;
  title: string;
  teacherId: string;
  batchId: string;
  courseId: string;
  subjectId: string;
  meetingLink: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  description?: string;
  notes?: string;
  recordingUrl?: string;
}

// Test Types
export interface Test {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  subjectId: string;
  chapterId?: string;
  createdBy: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  status: 'draft' | 'published' | 'archived';
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface Question {
  id: string;
  testId: string;
  type: 'mcq' | 'short_answer' | 'long_answer';
  question: string;
  options?: string[]; // for MCQ
  correctAnswer?: string | string[];
  marks: number;
  order: number;
}

export interface StudentAnswer {
  id: string;
  testId: string;
  studentId: string;
  questionId: string;
  answer: string | string[];
  submittedAt: string;
}

export interface Result {
  id: string;
  testId: string;
  studentId: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  status: 'pending' | 'graded' | 'published';
  teacherRemarks?: string;
  submittedAt: string;
  gradedAt?: string;
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  subjectId: string;
  createdBy: string;
  dueDate: string;
  attachmentUrl?: string;
  totalMarks: number;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionUrl: string;
  submittedAt: string;
  marksObtained?: number;
  teacherRemarks?: string;
  status: 'submitted' | 'graded' | 'late';
}

// Doubt Types
export interface Doubt {
  id: string;
  studentId: string;
  subjectId: string;
  question: string;
  imageUrl?: string;
  status: 'open' | 'answered' | 'resolved';
  createdAt: string;
}

export interface DoubtReply {
  id: string;
  doubtId: string;
  teacherId: string;
  reply: string;
  attachmentUrl?: string;
  createdAt: string;
}

// Fee Types
export interface Fee {
  id: string;
  studentId: string;
  courseId: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  dueDate: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
}

export interface Payment {
  id: string;
  feeId: string;
  studentId: string;
  amount: number;
  paymentMode: 'cash' | 'online' | 'cheque' | 'upi';
  transactionId?: string;
  receiptNumber: string;
  paidAt: string;
  collectedBy: string;
}

// Notification Types
export interface Notification {
  id: string;
  receiverId: string;
  message: string;
  type: 'material' | 'class' | 'test' | 'result' | 'fee' | 'doubt' | 'assignment' | 'announcement';
  relatedId?: string;
  read: boolean;
  createdAt: string;
}

// Analytics Types
export interface StudentAnalytics {
  studentId: string;
  testHistory: {
    testId: string;
    testName: string;
    marks: number;
    percentage: number;
    date: string;
  }[];
  averageScore: number;
  weakTopics: string[];
  strongTopics: string[];
  improvementTrend: 'improving' | 'stable' | 'declining';
  attendancePercentage: number;
}
