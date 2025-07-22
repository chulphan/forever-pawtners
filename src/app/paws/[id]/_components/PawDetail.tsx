'use client';

import PawInfo from '@/app/_components/PawInfo';
import { useFetchPawById } from '@/app/_lib/hooks/usePaw';
import { notFound } from 'next/navigation';

export default function PawDetail({ id }: { id: string }) {
  const { data: paw, error } = useFetchPawById(id);

  if (error || paw.error) {
    return notFound();
  }

  return <PawInfo paw={paw} variant="page" />;
}
