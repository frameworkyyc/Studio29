import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  to: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'light' | 'outline-light';
  className?: string;
  external?: boolean;
}

const styles = { solid: 'btn-solid', outline: 'btn-outline', light: 'btn-light', 'outline-light': 'btn-outline-light' } as const;

export default function Button({ to, children, variant = 'solid', className = '', external }: Props) {
  const cls = `btn ${styles[variant]} ${className}`;
  if (external) return <a href={to} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link to={to} className={cls}>{children}</Link>;
}
