export type PawQuery = {
  bgnde?: string;
  endde?: string;
  upkind?: string;
  kind?: string;
  upr_cd?: string;
  org_cd?: string;
  care_reg_no?: string;
  state?: string;
  neuter_yn?: string;
  pageNo?: number;
  numOfRows?: number;
};

export type City = {
  orgCd: string;
  orgdownNm: string;
};

export type FullCity = City & {
  uprCd: string;
};

export type SelectCity = {
  cityCode?: string;
  fullCityCode?: string;
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