import { PropsWithChildren, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container max-w-3xl mx-auto px-6 md:px-4', className)}>{children}</div>
  );
}
