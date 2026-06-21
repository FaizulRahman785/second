// Shared TypeScript types for the entire platform

export type UserRole = 'student' | 'teacher' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'blocked' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  profileImage?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile extends User {
  role: 'student';
  courseId?: string;
  batchId?: string;
  parentPhone?: string;
  address?: string;
  joiningDate: Date;
}

export interface TeacherProfile extends User {
  role: 'teacher';
  subjects: string[];
  batchIds: string[];
  qualification?: string;
  experience?: number;
}

export interface AdminProfile extends User {
  role: 'admin';
  permissions: string[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  classLevel: string;
  duration: number;
  fee: number;
  status: 'active' | 'inactive' | 'archived';
  subjects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  courseId: string;
  name: string;
  teacherId?: string;
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
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  cloudinaryId: string;
  fileType: string;
  fileSize: number;
  courseId: string;
  subjectId: string;
  chapterId?: string;
  uploadedBy: string;
  visibility: 'visible' | 'hidden';
  uploadedAt: Date;
}

export interface LiveClass {
  id: string;
  title: string;
  teacherId: string;
  batchId: string;
  courseId: string;
  subjectId: string;
  meetingLink: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  subjectId: string;
  chapterId?: string;
  teacherId: string;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  status: 'draft' | 'published' | 'archived';
  dueDate?: Date;
  createdAt: Date;
}

export interface Question {
  id: string;
  testId: string;
  questionText: string;
  questionType: 'mcq' | 'short' | 'long';
  options?: string[];
  correctAnswer?: string;
  marks: number;
  order: number;
}

export interface TestSubmission {
  id: string;
  testId: string;
  studentId: string;
  answers: Record<string, string>;
  submittedAt: Date;
  autoScore?: number;
  finalScore?: number;
  percentage?: number;
  teacherRemarks?: string;
  status: 'submitted' | 'graded' | 'pending';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  subjectId: string;
  teacherId: string;
  batchId: string;
  dueDate: Date;
  attachmentUrl?: string;
  totalMarks: number;
  createdAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl?: string;
  notes?: string;
  submittedAt: Date;
  marks?: number;
  teacherRemarks?: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Doubt {
  id: string;
  studentId: string;
  subjectId: string;
  question: string;
  imageUrl?: string;
  status: 'open' | 'answered' | 'resolved';
  createdAt: Date;
}

export interface DoubtReply {
  id: string;
  doubtId: string;
  teacherId: string;
  reply: string;
  attachmentUrl?: string;
  createdAt: Date;
}

export interface FeeStructure {
  id: string;
  studentId: string;
  courseId: string;
  totalFee: number;
  discount: number;
  finalAmount: number;
  dueDate: Date;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
}

export interface Payment {
  id: string;
  feeStructureId: string;
  studentId: string;
  amount: number;
  paymentDate: Date;
  paymentMode: 'cash' | 'online' | 'cheque' | 'upi';
  transactionId?: string;
  receiptNumber: string;
  createdBy: string;
}

export interface Notification {
  id: string;
  receiverId: string;
  message: string;
  type: 'material' | 'test' | 'class' | 'fee' | 'doubt' | 'assignment' | 'general';
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
