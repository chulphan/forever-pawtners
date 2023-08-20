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
    <select className={className} value={value} name={name} onChange={onSelect}>
      <option value={''} disabled hidden>
        선택해주세요
      </option>
      {children}
    </select>
  );
}
