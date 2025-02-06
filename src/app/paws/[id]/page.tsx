import MapDialog from '@/app/_components/MapDialog';
import { createClient } from '@/lib/supabase/server';

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
  console.log('paw detail ', paw);
  return (
    <div>
      <MapDialog address={paw.data[0].careAddr} />
    </div>
  );
}
