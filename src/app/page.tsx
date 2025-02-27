import { Suspense } from 'react';
import Paws from './_components/Paws';
import SearchBox from './_components/SearchBox';
import { getCities, getPaws } from './_lib/api';

export default async function Home() {
  const cities = (await getCities()) ?? [];
  const pawsResponseBody = await getPaws({
    pageNo: 1,
    numOfRows: 48,
    totalCount: 0,
  });

  const paws = pawsResponseBody.items.item;
  const numOfRows = pawsResponseBody.numOfRows ?? 0;
  const pageNo = pawsResponseBody.pageNo ?? 0;
  const totalCount = pawsResponseBody.totalCount ?? 0;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='flex min-h-screen flex-col items-center p-6 gap-4'>
        <SearchBox citiesParam={cities} />
        <Paws
          pawsParam={paws}
          numOfRowsParam={numOfRows}
          pageNoParam={pageNo}
          totalCountParam={totalCount}
        />
      </main>
    </Suspense>
  );
}
