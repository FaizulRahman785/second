// ============================================
// ADMIN APP - Main Entry Point
// ============================================

import React from 'react';
import { Page } from '../../../packages/shared-ui/src/components/LayoutComponents';
import { FullPageLoader } from '../../../packages/shared-ui/src';

export default function AdminApp() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check authentication status
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return <FullPageLoader message="Loading Admin Panel..." />;
  }

  return (
    <Page>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Phase 1: Foundation Complete</p>
          <div className="mt-8 text-sm text-left bg-muted p-6 rounded-lg max-w-md">
            <p className="font-semibold mb-2">✅ Admin App Initialized</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Separate frontend app structure</li>
              <li>• Shared UI components ready</li>
              <li>• Shared types defined</li>
              <li>• Utilities available</li>
              <li>• Ready for Phase 2: Authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
}
