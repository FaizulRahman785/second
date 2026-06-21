// ============================================
// LAYOUT COMPONENTS - Container, Section, Page wrappers
// ============================================

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function Container({ 
  children, 
  className = '', 
  maxWidth = 'xl' 
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function Section({ 
  children, 
  className = '', 
  title, 
  description,
  action 
}: SectionProps) {
  return (
    <section className={`py-6 ${className}`}>
      {(title || description || action) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumbs,
  actions 
}: PageHeaderProps) {
  return (
    <div className="border-b bg-background pb-6 mb-6">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex mb-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export function Page({ children, className = '' }: PageProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {children}
    </div>
  );
}
