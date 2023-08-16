'use client';

import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  className?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
