import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/Dialog';
import { useEffect, useRef } from 'react';

type MapDialogProps = {
  address: string;
};

function MapContainer({ address }: MapDialogProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: custom hook 으로 만들기
    if (window.kakao && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              +result[0].y,
              +result[0].x
            );

            const map = new window.kakao.maps.Map(
              mapContainerRef.current as HTMLDivElement,
              {
                center: coords,
                level: 3,
              }
            );

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });

            map.setCenter(coords);
            marker.setMap(map);
          } else {
            mapContainerRef.current?.setHTMLUnsafe(
              `
                  <div class="flex flex-col h-full justify-center items-center">
                    <h2 class="font-bold">주소가 올바르지 않습니다</h2>
                    <h2 class="font-bold">보호소로 연락해주세요</h2>
                  </div>
                `
            );
          }
        });
      });
    }
  }, []);

  return <div ref={mapContainerRef} className='w-full h-[400px]' />;
}

export default function MapDialog({ address }: MapDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className='ml-4'>지도보기</DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogDescription />
        <DialogTitle>{address}</DialogTitle>
        <MapContainer address={address} />
      </DialogContent>
    </Dialog>
  );
}
