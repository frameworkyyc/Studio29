import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/lib/hooks';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const [ref, seen] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'is-visible' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
