import { Suspense } from 'react';
import Modal from './modal';
import SkeletonModal from './SkeletonModal';

export default async function PawDialogPage() {
  return (
    <Suspense fallback={<SkeletonModal />}>
      <Modal />
    </Suspense>
  );
}
