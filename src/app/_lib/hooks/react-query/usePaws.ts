import { infiniteQueryOptions } from '@tanstack/react-query';
import { getPaws } from '../../api';

export type PawsQueryParamProps = {
  pageNo: number;
  numOfRows: number;
  totalCount: number;
};

const pawsQueryDefaultParams = {
  pageNo: 1,
  numOfRows: 48,
  totalCount: 0,
};

export const pawsQueryOptions = ({
  pageNo,
  numOfRows,
  totalCount,
}: PawsQueryParamProps = pawsQueryDefaultParams) => {
  return (pawsSearchParam?: PawsQueryParamProps) => {
    return infiniteQueryOptions({
      queryKey: ['paws', pawsSearchParam],
      queryFn: async ({ pageParam }) => {
        const { pageNo, numOfRows, totalCount } = pageParam;

        return await getPaws({
          ...(pawsSearchParam ?? {}),
          pageNo,
          numOfRows,
          totalCount,
        });
      },
      initialPageParam: {
        pageNo,
        numOfRows,
        totalCount,
      },
      getNextPageParam: (lastPage) => {
        const totalPage =
          (lastPage.totalCount ?? 0 % (lastPage.numOfRows ?? 48) === 0)
            ? Math.floor((lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48))
            : Math.floor((lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48)) + 1;

        const hasNextPage = (lastPage.pageNo ?? 1) <= totalPage;
        if (hasNextPage) {
          return {
            pageNo: (lastPage.pageNo ?? 1) + 1,
            totalCount: lastPage.totalCount,
            numOfRows: lastPage.numOfRows,
          };
        }

        return undefined;
      },
    });
  };
};
