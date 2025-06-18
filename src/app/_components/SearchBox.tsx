'use client';

import { Suspense, useState } from 'react';
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
import { Form, FormField, FormItem } from '@/shadcn/components/Form';
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ToggleGroup';
import { AnimatePresence, motion } from 'motion/react';
import { useSido } from '../_lib/hooks/react-query/useSido';
import { useSigungu } from '../_lib/hooks/react-query/useSigungu';
import { LoaderIcon } from 'lucide-react';
import { useBreed } from '../_lib/hooks/react-query/useBreed';

type ValuePiece = Date | null | undefined;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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

export default function SearchBox() {
  const [dateValue, onDateValueChange] = useState<Value>([undefined, undefined]);
  const setPawQuery = usePawQueryStore((state) => state.setQuery);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const { data: cities } = useSido();

  const form = useForm<SearchState>();

  const uprCd = form.watch('upr_cd');
  const { data: fullCities, isPending: isSigunguPending } = useSigungu(uprCd);

  const upKind = form.watch('upkind');
  const { data: breeds } = useBreed(upKind);

  const convertDate = (date?: ValuePiece) => {
    if (!date) {
      return;
    }

    return dateFormat(date, 'yyyymmdd');
  };

  const onSearchBtnClick = async (searchState: SearchState) => {
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
    onDateValueChange([undefined, undefined]);
  };

  return (
    <>
      <div className={'flex self-end'}>
        <Button
          className={'px-8 py-2 rounded-md bg-[#03A678] hover:opacity-80 text-white font-bold'}
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
        >
          검색
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {isSearchBoxOpen ? (
          <Form {...form}>
            <motion.form
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              key="search-form"
              className={`flex flex-col gap-4 w-full  overflow-hidden`}
              onSubmit={form.handleSubmit(onSearchBtnClick)}
            >
              <div className={'flex flex-row gap-4 items-center'}>
                <FormField
                  control={form.control}
                  name="upr_cd"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value ?? ''}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue('org_cd', '');
                        }}
                      >
                        <SelectTrigger className="w-[180px] border-2 border-[#03A678] rounded-md">
                          <SelectValue placeholder="광역시/도" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {cities?.map((city) => (
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
                {uprCd &&
                  (isSigunguPending ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <FormField
                      control={form.control}
                      name="org_cd"
                      render={({ field }) => (
                        <FormItem>
                          <Select value={field.value ?? ''} onValueChange={field.onChange}>
                            <SelectTrigger className="border-2 border-[#03A678] rounded w-[180px] rounded-md">
                              <SelectValue placeholder="시/군/구" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {fullCities?.map((city) => (
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
                  ))}
              </div>
              <div className={'flex gap-4'}>
                <FormField
                  control={form.control}
                  name="upkind"
                  render={({ field }) => (
                    <FormItem>
                      <ToggleGroup
                        type="single"
                        value={field.value ?? ''}
                        onValueChange={field.onChange}
                      >
                        {ANIMAL_KINDS.map((animalKind) => (
                          <ToggleGroupItem
                            className="w-14"
                            key={animalKind.upkind}
                            value={animalKind.upkind}
                          >
                            {animalKind.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormItem>
                  )}
                />
              </div>
              <Suspense fallback={<div className="animate-pulse w-[180px] h-9 bg-gray-400" />}>
                {breeds?.items?.item && breeds?.items?.item?.length > 0 && (
                  <FormField
                    control={form.control}
                    name="kind"
                    render={({ field }) => (
                      <FormItem>
                        <Select value={field.value ?? ''} onValueChange={field.onChange}>
                          <SelectTrigger className="border-2 border-[#03A678] rounded w-[180px] rounded-md">
                            <SelectValue placeholder="전체" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {breeds?.items?.item?.map((breed) => (
                                <SelectItem key={breed.kindCd} value={breed.kindCd}>
                                  {breed.kindNm}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </Suspense>
              <div className={'flex gap-4'}>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <Select value={field.value ?? ''} onValueChange={field.onChange}>
                      <SelectTrigger className="border-2 border-[#03A678] rounded w-[100px] rounded-md">
                        <SelectValue placeholder="공고여부" />
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
                  name="neuter_yn"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value ?? ''} onValueChange={field.onChange}>
                        <SelectTrigger className="border-2 border-[#03A678] rounded w-[120px] rounded-md">
                          <SelectValue placeholder="중성화여부" />
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
                  format="yyyyMMdd"
                />
              </div>
              <div className={'flex gap-4'}>
                <Button type="submit" className="rounded-md bg-[#03A678] p-2 text-white font-bold">
                  <span className="block w-12">찾기</span>
                </Button>
                <Button
                  type="reset"
                  className="rounded-md bg-gray-200 p-2 font-bold"
                  onClick={initialize}
                >
                  <span className={'block w-12'}>초기화</span>
                </Button>
              </div>
            </motion.form>
          </Form>
        ) : null}
      </AnimatePresence>
    </>
  );
}
