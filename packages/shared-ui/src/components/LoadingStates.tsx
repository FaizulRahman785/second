// ============================================
// LOADING STATES - Reusable Loading Components
// ============================================

import React from 'react';
import { Skeleton } from '../../../../src/app/components/ui/skeleton';

// Full Page Loader
export function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}

// Component Loader (for sections)
export function ComponentLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

// Button Loader
export function ButtonLoader() {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
  );
}

// Card Loading Skeleton
export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

// Table Loading Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// List Loading Skeleton
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Dashboard Stats Skeleton
export function StatsCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-3">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}
