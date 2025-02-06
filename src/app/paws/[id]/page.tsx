import MapDialog from '@/app/_components/MapDialog';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function PawsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const id = (await params).id;
  console.log('id', id);
  const supabase = await createClient();
  const paw = await supabase.from('paw').select(`*`).eq('desertionNo', id);

  if (!paw) {
    notFound();
  }

  if (!paw.data) {
    notFound();
  }

  return (
    <div>
      <MapDialog address={paw.data[0].careAddr} />
    </div>
  );
}
