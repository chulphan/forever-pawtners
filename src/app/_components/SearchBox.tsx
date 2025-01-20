'use client';

import { useState } from 'react';
import { ANIMAL_KIND_CODE, City, PawQuery, SearchState } from '../_types';
import { getBreed } from '../_lib/api';
import useFullCities from '../_lib/hooks/useFullCities';
import dateFormat from 'dateformat';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@/shadcn/components/Button';
import { useQuery } from '@tanstack/react-query';
import { usePawQueryStore } from '../_lib/stores';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/Select';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { Form, FormField, FormItem } from '@/shadcn/components/Form';
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ToggleGroup';

type ValuePiece = Date | null | undefined;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type SearchBoxProps = {
  citiesParam: City[];
};

const ANIMAL_KINDS: Array<{ upkind: ANIMAL_KIND_CODE; label: string }> = [
  {
    upkind: '417000',
    label: '개',
  },
  {
    upkind: '422400',
    label: '고양이',
  },
  {
    upkind: '429900',
    label: '기타',
  },
];

const STATES = [
  {
    state: 'notice',
    label: '공고중',
  },
  {
    state: 'protect',
    label: '보호중',
  },
];

const NEUTERS = [
  {
    state: 'Y',
    label: '중성화 ✅',
  },
  {
    state: 'N',
    label: '중성화 ❌',
  },
  {
    state: 'U',
    label: '중성화 ❓',
  },
];

export default function SearchBox({ citiesParam }: SearchBoxProps) {
  const [dateValue, onDateValueChange] = useState<Value>([
    undefined,
    undefined,
  ]);
  const [searchState, setSearchState] = useState<SearchState>({});
  const setPawQuery = usePawQueryStore((state) => state.setQuery);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const form = useForm<SearchState>();

  const upr_cd = form.watch('upr_cd');
  const fullCities = useFullCities(upr_cd);

  const upKind = form.watch('upkind');
  const { data: breeds, isLoading: isFetchBreedLoading } = useQuery({
    queryKey: ['breeds', upKind],
    queryFn: () => getBreed(upKind),
    enabled: !!upKind,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000,
  });

  const onSelectChange = (name: string, value: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAnimalKindChange = async (animalCode: ANIMAL_KIND_CODE) => {
    try {
      const nextSearchState = { ...searchState };
      delete nextSearchState.kind;

      if (animalCode === searchState.upkind) {
        delete nextSearchState.upkind;
      } else {
        nextSearchState.upkind = animalCode;
      }

      setSearchState(nextSearchState);
    } catch (e) {}
  };

  const convertDate = (date?: ValuePiece) => {
    if (!date) {
      return;
    }

    return dateFormat(date, 'yyyymmdd');
  };

  const onSearchBtnClick = async (searchState: SearchState) => {
    console.log('searchState ', searchState);
    try {
      const [bgnde, endde] = (dateValue as Array<ValuePiece>) ?? [];
      const _pawQuery = {
        ...searchState,
        pageNo: 1,
        numOfRows: 48,
        totalCount: 0,
        bgnde: convertDate(bgnde),
        endde: convertDate(endde),
      } as PawQuery;

      if (!bgnde) {
        delete _pawQuery.bgnde;
      }

      if (!endde) {
        delete _pawQuery.endde;
      }

      setPawQuery(_pawQuery);
    } catch (e) {
      console.log(e);
    }
  };

  const initialize = () => {
    form.reset({});
    setSearchState({});
    onDateValueChange([undefined, undefined]);
  };

  return (
    <>
      <div className={'flex self-end'}>
        <Button
          className={
            'px-8 py-2 rounded bg-[#03A678] hover:opacity-80 text-white'
          }
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}>
          검색
        </Button>
      </div>
      <Form {...form}>
        <form
          className={`flex flex-col gap-4 w-full transition-opacity ease-out duration-500 overflow-hidden ${
            isSearchBoxOpen ? 'opacity-100' : 'opacity-0 max-h-0'
          }`}
          onSubmit={form.handleSubmit(onSearchBtnClick)}>
          <div className={'flex flex-row gap-4'}>
            <FormField
              control={form.control}
              name='upr_cd'
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('org_cd', '');
                    }}>
                    <SelectTrigger className='w-[180px] border-2 border-[#03A678] rounded'>
                      <SelectValue placeholder='광역시/도' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {citiesParam.map((city) => (
                          <SelectItem key={city.orgCd} value={city.orgCd}>
                            {city.orgdownNm}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {upr_cd && fullCities[upr_cd] && (
              <FormField
                control={form.control}
                name='org_cd'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={field.onChange}>
                      <SelectTrigger className='border-2 border-[#03A678] rounded w-[180px]'>
                        <SelectValue placeholder='시/군/구' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {fullCities[upr_cd].map((city) => (
                            <SelectItem key={city.orgCd} value={city.orgCd}>
                              {city.orgdownNm}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className={'flex gap-4'}>
            <FormField
              control={form.control}
              name='upkind'
              render={({ field }) => (
                <FormItem>
                  <ToggleGroup
                    type='single'
                    value={field.value ?? ''}
                    onValueChange={field.onChange}>
                    {ANIMAL_KINDS.map((animalKind) => (
                      <ToggleGroupItem
                        className='w-14'
                        key={animalKind.upkind}
                        value={animalKind.upkind}>
                        {animalKind.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormItem>
              )}
            />
          </div>
          {isFetchBreedLoading ? (
            <Loader className='animate-spin' />
          ) : (
            breeds?.items?.item &&
            breeds?.items?.item?.length > 0 && (
              <FormField
                control={form.control}
                name='kind'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={field.onChange}>
                      <SelectTrigger className='border-2 border-[#03A678] rounded w-[180px]'>
                        <SelectValue placeholder='전체' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {breeds?.items?.item?.map((breed) => (
                            <SelectItem key={breed.kindCd} value={breed.kindCd}>
                              {breed.knm}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )
          )}
          <div className={'flex gap-4'}>
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}>
                  <SelectTrigger className='border-2 border-[#03A678] rounded w-[100px]'>
                    <SelectValue placeholder='공고여부' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATES.map((state) => (
                        <SelectItem key={state.state} value={state.state}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={form.control}
              name='neuter_yn'
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}>
                    <SelectTrigger className='border-2 border-[#03A678] rounded w-[120px]'>
                      <SelectValue placeholder='중성화여부' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {NEUTERS.map((neuter) => (
                          <SelectItem key={neuter.state} value={neuter.state}>
                            {neuter.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className={'z-10'}>
            <DateRangePicker
              value={dateValue as unknown as null}
              onChange={onDateValueChange}
              format='yyyyMMdd'
            />
          </div>
          <div className={'flex gap-4'}>
            <Button
              type='submit'
              className='rounded bg-[#03A678] p-2 text-white'>
              <span className='block w-12'>찾기</span>
            </Button>
            <Button
              type='reset'
              className='rounded bg-gray-200 p-2'
              onClick={initialize}>
              <span className={'block w-12'}>초기화</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
