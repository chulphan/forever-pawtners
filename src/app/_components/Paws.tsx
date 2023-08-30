'use client';
import React, {useRef} from 'react';
import Image from 'next/image';
import {Paw, ResponseBodyType} from '../_types';
import Modal from './Modal';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {modalState, pawQueryState, pawState,} from '../_lib/recoil/atom';
import useIntersectionObserver from '../_lib/hooks/useIntersectionObserver';
import {getPaws} from '../_lib/api';
import {useInfiniteQuery} from 'react-query';

const labelColorVariants = {
    protect: 'bg-[#03A678]',
    end: 'bg-[#1E3859]',
    notice: 'bg-[#048ABF]',
};

export default function Paws({
                                 pawsParam,
                                 numOfRowsParam,
                                 pageNoParam,
                                 totalCountParam,
                             }: {
    pawsParam: Paw[];
    numOfRowsParam: number;
    pageNoParam: number;
    totalCountParam: number;
}) {
    const pawQuery = useRecoilValue(pawQueryState);
    const setSelectedPaw = useSetRecoilState(pawState);
    const [isPawModalOpen, setIsPawModalOpen] = useRecoilState(modalState);
    const loadMoreRef = useRef<HTMLLIElement>(null);

    const {
        data,
        isFetching: isFetchingPaws,
        fetchNextPage,
        hasNextPage: hasPawsNextPage,
    } = useInfiniteQuery<ResponseBodyType<Paw>>(
        ['pawList', pawQuery],
        async ({pageParam}) => {
            return await getPaws({
                ...pawQuery,
                ...pageParam,
            });
        },
        {
            getNextPageParam: (lastPage) => {
                const totalPage =
                    lastPage.totalCount ?? 0 % (lastPage.numOfRows ?? 48) === 0
                        ? Math.floor((lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48))
                        : Math.floor((lastPage.totalCount ?? 0) / (lastPage.numOfRows ?? 48)) + 1;

                const hasNextPage = (lastPage.pageNo ?? 1) <= totalPage;
                if (hasNextPage) {
                    return {
                        ...lastPage,
                        pageNo: (lastPage.pageNo ?? 1) + 1,
                    };
                }

                return undefined;
            },
            initialData: () => {
                const initialData = {
                    items: {
                        item: pawsParam
                    },
                    numOfRows: numOfRowsParam,
                    pageNo: pageNoParam,
                    totalCount: totalCountParam
                };

                return {
                    pages: [initialData],
                    pageParams: [initialData],
                };
            },
            keepPreviousData: true,
            retry: false,
            // staleTime 이 있으니까... 찾기 버튼이 동작하지 않는다ㅠㅠ
        }
    );

    const pawListItem = data?.pages.map(page => page.items).flatMap(item => item.item).filter(item => item);

    useIntersectionObserver({
        // root: rootRef,
        target: loadMoreRef,
        threshold: 1,
        onIntersect: async () => {
            if (!isFetchingPaws) {
                await fetchNextPage();
            }
        },
        enabled: !!hasPawsNextPage,
    });

    const onPawClick = (paw: Paw) => {
        setIsPawModalOpen(true);
        setSelectedPaw(paw);
    };

    const getColorBy = (processState: string) => {
        if (processState.includes('종료')) {
            return labelColorVariants.end;
        }

        if (processState.includes('보호')) {
            return labelColorVariants.protect;
        }

        if (processState.includes('공고')) {
            return labelColorVariants.notice;
        }

        return '';
    };

    return (
        <ul
            className={
                'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'
            }>
            {pawListItem && pawListItem.length > 0 ? pawListItem.map((paw) => (
                <li
                    key={paw.desertionNo}
                    className={
                        'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded cursor-pointer'
                    }
                    onClick={() => onPawClick(paw)}>
                    <div
                        className={`flex justify-between font-bold text-md ${getColorBy(
                            paw.processState
                        )} text-white p-2`}>
                        <span>
                          {paw.kindCd} / {paw.processState}
                        </span>
                        <span className={'font-bold text-md'}>
                          {paw.sexCd === 'F' ? '♀' : '♂'}
                        </span>
                    </div>
                    <div className={'h-[200px] rounded'} style={{position: 'relative'}}>
                        <Image
                            src={paw.popfile}
                            alt={`${paw.kindCd} 이미지`}
                            className={'w-full h-full rounded'}
                            fill
                            priority
                            sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                        />
                    </div>
                    <div className={'flex flex-col gap-2 font-normal text-md'}>
                        <p>
                            {paw.age} / {paw.weight}
                        </p>
                        <p>
                            {paw.orgNm} {paw.careNm}
                        </p>
                    </div>
                </li>
            )) : <div className={'w-full h-full'}>
                찾으시는 유기동물이 없어요
            </div>}
            <li ref={loadMoreRef} className={!hasPawsNextPage ? 'hidden' : ''}></li>
            {isPawModalOpen && <Modal/>}
        </ul>
    );
}
