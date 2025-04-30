type NavigateShareContentGeneratorProps = {
  kindCd?: string;
  sexCd?: string;
  orgNm?: string;
  happenPlace?: string;
  desertionNo?: string;
};

export const navigateShareContentGenerator = ({
  kindCd,
  sexCd,
  orgNm,
  happenPlace,
  desertionNo,
}: NavigateShareContentGeneratorProps) => {
  return {
    title: `${kindCd}-${sexCd} 유기동물, 내 평생 파트너`,
    text: `발견장소: ${orgNm} ${happenPlace}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/paws/${desertionNo}`,
  };
};
