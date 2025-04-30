import { Button } from '@/shadcn/components/Button';

type WebApiShareButtonProps = {
  title: string;
  text: string;
  url: string;
};

export default function WebApiShareButton({ title, text, url }: WebApiShareButtonProps) {
  const onShareButtonClick = async () => {
    try {
      await window.navigator.share({
        title,
        text,
        url,
      });
    } catch (e) {
      console.log('공유 오류: ', e);
    }
  };

  return (
    <Button className="bg-protect hover:bg-protect/80" onClick={onShareButtonClick}>
      <span className="font-bold">공유</span>
    </Button>
  );
}
