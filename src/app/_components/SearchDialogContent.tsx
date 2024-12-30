import { useEffect, useRef } from 'react';

type SearchDialogContentProps = {
  address: string;
};

export default function SearchDialogContent({
  address,
}: SearchDialogContentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: custom hook 으로 만들기
    if (window.kakao && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );
        const map = new window.kakao.maps.Map(
          mapContainerRef.current as HTMLDivElement,
          {
            center: markerPosition,
            level: 3,
          }
        );

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              +result[0].y,
              +result[0].x
            );

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });

            map.setCenter(coords);
            marker.setMap(map);
          }
        });
      });
    }
  }, []);

  return <div ref={mapContainerRef} className='w-full h-[400px]' />;
}
