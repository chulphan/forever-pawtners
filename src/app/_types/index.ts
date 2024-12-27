export type ResponseHeaderType = {
  reqNo: string;
  resultCode: string;
  resultMsg: string;
  errorMsg?: string;
};

export type ResponseItemType<T> = {
  item: T[];
};

export type ResponseBodyType<T> = {
  items: ResponseItemType<T>;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};

export type ResponseType<T> = {
  response: {
    header: ResponseHeaderType;
    body?: ResponseBodyType<T>;
  };
};

export type PawQuery = {
  bgnde?: string;
  endde?: string;
  upkind?: ANIMAL_KIND_CODE;
  kind?: string;
  upr_cd?: string;
  org_cd?: string;
  care_reg_no?: string;
  state?: string;
  neuter_yn?: string;
  pageNo: number;
  numOfRows: number;
  totalCount: number;
  items: {
    item: Paw[];
  };
};

export type SearchState = Omit<
  PawQuery,
  'pageNo' | 'numOfRows' | 'totalCount' | 'items'
>;

export type City = {
  orgCd: string;
  orgdownNm: string;
};

export type FullCity = City & {
  uprCd: string;
};

export type Shelter = {
  careRegNo: string;
  careNm: string;
};

export type Paw = {
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
};

export const ANIMAL_KIND_DOG = '417000' as const;
export const ANIMAL_KIND_CAT = '422400' as const;
export const ANIMAL_KIND_OTHERS = '429900' as const;

export type ANIMAL_KIND_CODE =
  | typeof ANIMAL_KIND_DOG
  | typeof ANIMAL_KIND_CAT
  | typeof ANIMAL_KIND_OTHERS;

export type Breed = {
  kindCd: string;
  knm: string;
};
