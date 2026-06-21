// ============================================
// CONFIRM DIALOG - Reusable Confirmation Component
// ============================================

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../src/app/components/ui/alert-dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Preset confirmation dialogs

interface DeleteConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirm({
  open,
  onOpenChange,
  itemName,
  onConfirm,
  isLoading,
}: DeleteConfirmProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Are you sure?"
      description={`This will permanently delete "${itemName}". This action cannot be undone.`}
      confirmText="Delete"
      variant="destructive"
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  );
}

export function BlockConfirm({
  open,
  onOpenChange,
  userName,
  onConfirm,
  isLoading,
}: DeleteConfirmProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Block User"
      description={`Are you sure you want to block "${userName}"? They will no longer be able to access the system.`}
      confirmText="Block"
      variant="destructive"
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  );
}

export function LogoutConfirm({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: Omit<DeleteConfirmProps, 'itemName'>) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Logout"
      description="Are you sure you want to logout?"
      confirmText="Logout"
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  );
}
