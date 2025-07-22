'use client';

import { usePawStore } from '@/app/_lib/stores';
import { Button } from '@/shadcn/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shadcn/components/Dialog';
import { useRouter } from 'next/navigation';
import PawInfo from '@/app/_components/PawInfo';

export default function Modal() {
  const { back } = useRouter();
  const paw = usePawStore((state) => state.paw);

  return (
    <Dialog
      defaultOpen={true}
      modal={true}
      onOpenChange={(open) => {
        if (!open) {
          back();
        }
      }}
    >
      {paw && (
        <DialogContent className="sm:max-w-[70%] xl:max-w-[60%] overflow-y-auto max-h-[550px] bg-white">
          <div className="flex justify-center">
            <DialogTitle className="sr-only">
              {paw.kindFullNm} {paw.sexCd === 'F' ? '♀' : '♂'}
            </DialogTitle>
            <DialogDescription />
            <PawInfo paw={paw} variant="modal" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
