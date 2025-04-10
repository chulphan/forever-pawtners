import { fetchPawById } from '@/app/_lib/hooks/usePaw';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PawDetail from './_components/PawDetail';
import { Metadata } from 'next';
import { Paw } from '@/app/_types';

type PawPageMetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: PawPageMetadataProps,
): Promise<Metadata> {
  const { id } = await params;

  const paw = (await fetchPawById(id)) as Paw;

  return {
    title: `유기동물, 내 평생 파트너 - ${paw.kindCd}`,
    description: `유기견/유기묘, 사지말고 입양하세요. 상태: ${paw.processState} 발견 장소: ${paw.orgNm} ${paw.happenPlace} 접수일자: ${paw.happenDt}`,
    openGraph: {
      images: [paw.filename],
    },
  };
}

export default async function PawsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const queryClient = new QueryClient();
  const id = (await params).id;

  await queryClient.prefetchQuery({
    queryKey: ['paw', id],
    queryFn: () => fetchPawById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PawDetail id={id} />
    </HydrationBoundary>
  );
}
