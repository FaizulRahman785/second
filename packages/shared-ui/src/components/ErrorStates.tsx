// ============================================
// ERROR STATES - Reusable Error Components
// ============================================

import React from 'react';
import { Button } from '../../../../src/app/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../../../src/app/components/ui/alert';
import { AlertCircle, WifiOff, ServerCrash, Lock, XCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title, description, onRetry, className = '' }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="rounded-full bg-destructive/10 p-6 mb-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

// Network Error
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-4">
        <WifiOff className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Unable to connect to the server. Please check your internet connection and try again.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Retry Connection
        </Button>
      )}
    </div>
  );
}

// Server Error
export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-4">
        <ServerCrash className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Server Error</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Something went wrong on our end. We're working to fix it. Please try again later.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

// Permission Denied
export function PermissionDenied() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-4">
        <Lock className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        You don't have permission to access this resource. Please contact your administrator.
      </p>
    </div>
  );
}

// Not Found (404)
export function NotFound({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <XCircle className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Not Found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {message || 'The page or resource you're looking for doesn't exist.'}
      </p>
    </div>
  );
}

// Inline Error Alert
export function InlineError({ 
  title, 
  message, 
  onDismiss 
}: { 
  title?: string; 
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Form Field Error
export function FieldError({ message }: { message: string }) {
  return (
    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {message}
    </p>
  );
}
