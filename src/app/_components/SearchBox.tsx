'use client';

import {useState} from 'react';
import {ANIMAL_KIND_CODE, Breed, City, PawQuery, SearchState,} from '../_types';
import {useSetRecoilState} from 'recoil';
import {pawQueryState} from '../_lib/recoil/atom';
import Select from './Select';
import {getBreed} from '../_lib/api';
import Button from './Button';
import useFullCities from '../_lib/hooks/useFullCities';
import dateFormat from 'dateformat';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import {useQuery} from 'react-query';

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

export default function SearchBox({
                                      citiesParam,
                                  }: SearchBoxProps) {
    const [dateValue, onDateValueChange] = useState<Value>([
        undefined,
        undefined,
    ]);
    const [searchState, setSearchState] = useState<SearchState>({});
    const setPawQuery = useSetRecoilState(pawQueryState);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [breed, setBreed] = useState<{
        [key in ANIMAL_KIND_CODE]?: Array<Breed>;
    }>({});
    const fullCities = useFullCities(searchState.upr_cd);

    const {} = useQuery(
        ['breeds', searchState.upkind],
        () => getBreed(searchState.upkind),
        {
            onSuccess: (data) => {
                setBreed((prevState) => ({
                    ...prevState,
                    [searchState.upkind as ANIMAL_KIND_CODE]: data.items.item ?? [],
                }));
            },
            enabled: !!searchState.upkind && !breed[searchState.upkind],
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        setSearchState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onAnimalKindChange = async (animalCode: ANIMAL_KIND_CODE) => {
        try {
            const nextSearchState = {...searchState};
            delete nextSearchState.kind;

            if (animalCode === searchState.upkind) {
                delete nextSearchState.upkind;
            } else {
                nextSearchState.upkind = animalCode;
            }

            setSearchState(nextSearchState);
        } catch (e) {
        }
    };

    const convertDate = (date?: ValuePiece) => {
        if (!date) {
            return;
        }

        return dateFormat(date, 'yyyymmdd');
    };

    const onSearchBtnClick = async () => {
        const [bgnde, endde] = (dateValue as Array<ValuePiece>) ?? [];
        try {
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
        }
    };

    const initialize = () => {
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
            <div
                className={`flex flex-col gap-4 w-full transition-opacity ease-out duration-500 overflow-hidden ${
                    isSearchBoxOpen ? 'opacity-100' : 'opacity-0 max-h-0'
                }`}>
                <div className={'flex flex-row gap-4'}>
                    <Select
                        className={'border-2 border-[#03A678] rounded p-2'}
                        name={'upr_cd'}
                        value={searchState.upr_cd ?? ''}
                        onSelect={onSelectChange}>
                        {citiesParam.map((city) => (
                            <option key={city.orgCd} value={city.orgCd}>
                                {city.orgdownNm}
                            </option>
                        ))}
                    </Select>
                    {searchState.upr_cd && fullCities[searchState.upr_cd] && (
                        <Select
                            className={'border-2 border-[#03A678] rounded p-2'}
                            name={'org_cd'}
                            value={searchState.org_cd ?? ''}
                            onSelect={onSelectChange}>
                            {fullCities[searchState.upr_cd].map((city) => (
                                <option key={city.orgCd} value={city.orgCd}>
                                    {city.orgdownNm}
                                </option>
                            ))}
                        </Select>
                    )}
                </div>
                <div className={'flex gap-4'}>
                    {ANIMAL_KINDS.map((animalKind) => (
                        <Button
                            key={animalKind.upkind}
                            onClick={() => onAnimalKindChange(animalKind.upkind)}
                            className={`bg-[#03A678] hover:opacity-80 text-white rounded p-2 ${
                                animalKind.upkind === searchState.upkind
                                    ? 'border-4 border-green-700'
                                    : ''
                            }`}>
              <span
                  className={`block w-[50px] ${
                      animalKind.upkind === searchState.upkind ? 'font-bold' : ''
                  }`}>
                {animalKind.label}
              </span>
                        </Button>
                    ))}
                </div>
                {searchState.upkind && breed[searchState.upkind] && (
                    <div>
                        <Select
                            name={'kind'}
                            value={searchState.kind ?? ''}
                            className='border border-green-500 rounded p-2'
                            onSelect={onSelectChange}>
                            {breed[searchState.upkind]?.map((breed) => (
                                <option key={breed.kindCd} value={breed.kindCd}>
                                    {breed.knm}
                                </option>
                            ))}
                        </Select>
                    </div>
                )}
                <div className={'flex gap-4'}>
                    <Select
                        name={'state'}
                        value={searchState.state ?? ''}
                        className='border border-green-500 rounded p-2'
                        onSelect={onSelectChange}>
                        {STATES.map((state) => (
                            <option key={state.state} value={state.state}>
                                {state.label}
                            </option>
                        ))}
                    </Select>
                    <Select
                        name={'neuter_yn'}
                        value={searchState.neuter_yn ?? ''}
                        className='border border-green-500 rounded p-2'
                        onSelect={onSelectChange}>
                        {NEUTERS.map((neuter) => (
                            <option key={neuter.state} value={neuter.state}>
                                {neuter.label}
                            </option>
                        ))}
                    </Select>
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
                        className='rounded bg-[#03A678] p-2 text-white'
                        onClick={onSearchBtnClick}>
                        <span className='block w-12'>찾기</span>
                    </Button>
                    <Button className='rounded bg-gray-200 p-2' onClick={initialize}>
                        <span className={'block w-12'}>초기화</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
