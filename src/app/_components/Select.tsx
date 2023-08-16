'use client';

import { ReactNode } from 'react';

type SelectProps<T> = {
  name: string;
  value: string;
  children: ReactNode;
  onSelect(e: React.ChangeEvent<HTMLSelectElement>): void;
  className?: string;
};

export default function Select<T>({
  name,
  value,
  children,
  onSelect,
  className,
}: SelectProps<T>) {
  return (
    <select className={className} name={name} value={value} onChange={onSelect}>
      {children}
    </select>
  );
}
