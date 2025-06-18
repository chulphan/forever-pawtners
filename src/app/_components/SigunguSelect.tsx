import { Control, useFormContext } from 'react-hook-form';
import { SearchState } from '../_types';
import { FormField, FormItem } from '@/shadcn/components/Form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/Select';
import { useSigungu } from '../_lib/hooks/react-query/useSigungu';

type SigunguSelectProps = {
  uprCd?: string;
};

export default function SigunguSelect({ uprCd }: SigunguSelectProps) {
  const form = useFormContext();
  const { data: fullCities, isPending: isSigunguPending } = useSigungu(uprCd);

  if (isSigunguPending) {
    return <div className="w-[180px] animate-pulse" />;
  }

  return (
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
  );
}
