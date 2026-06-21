// ============================================
// EMPTY STATES - Reusable Empty State Components
// ============================================

import React from 'react';
import { Button } from '../../../../src/app/components/ui/button';
import { 
  FileQuestion, 
  FolderOpen, 
  Users, 
  BookOpen, 
  Calendar,
  MessageSquare,
  FileText,
  GraduationCap,
  DollarSign,
  Bell
} from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        {icon || <FileQuestion className="h-12 w-12 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}

// Specific empty states for different resources

export function NoDataFound() {
  return (
    <EmptyState
      icon={<FolderOpen className="h-12 w-12 text-muted-foreground" />}
      title="No data found"
      description="There are no items to display at the moment."
    />
  );
}

export function NoStudents({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12 text-muted-foreground" />}
      title="No students yet"
      description="Start by adding your first student to the system."
      action={onAdd ? { label: 'Add Student', onClick: onAdd } : undefined}
    />
  );
}

export function NoTeachers({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<GraduationCap className="h-12 w-12 text-muted-foreground" />}
      title="No teachers yet"
      description="Add teachers who will manage courses and students."
      action={onAdd ? { label: 'Add Teacher', onClick: onAdd } : undefined}
    />
  );
}

export function NoCourses({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<BookOpen className="h-12 w-12 text-muted-foreground" />}
      title="No courses available"
      description="Create your first course to get started with teaching."
      action={onAdd ? { label: 'Create Course', onClick: onAdd } : undefined}
    />
  );
}

export function NoMaterials({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12 text-muted-foreground" />}
      title="No study materials"
      description="Upload notes, PDFs, or other learning resources for students."
      action={onAdd ? { label: 'Upload Material', onClick: onAdd } : undefined}
    />
  );
}

export function NoLiveClasses({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
      title="No live classes scheduled"
      description="Schedule your first live class to connect with students."
      action={onAdd ? { label: 'Schedule Class', onClick: onAdd } : undefined}
    />
  );
}

export function NoTests({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FileQuestion className="h-12 w-12 text-muted-foreground" />}
      title="No tests available"
      description="Create tests to evaluate student performance."
      action={onAdd ? { label: 'Create Test', onClick: onAdd } : undefined}
    />
  );
}

export function NoDoubts() {
  return (
    <EmptyState
      icon={<MessageSquare className="h-12 w-12 text-muted-foreground" />}
      title="No doubts yet"
      description="Students can ask questions and teachers will respond here."
    />
  );
}

export function NoPayments() {
  return (
    <EmptyState
      icon={<DollarSign className="h-12 w-12 text-muted-foreground" />}
      title="No payment records"
      description="Fee payments will appear here once recorded."
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-12 w-12 text-muted-foreground" />}
      title="No notifications"
      description="You're all caught up! New notifications will appear here."
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={<FileQuestion className="h-12 w-12 text-muted-foreground" />}
      title="No results found"
      description="Try adjusting your search or filter to find what you're looking for."
    />
  );
}
