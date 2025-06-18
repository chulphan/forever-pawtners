import { useFormContext } from 'react-hook-form';
import { useSido } from '../_lib/hooks/react-query/useSido';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/Select';
import { FormField, FormItem } from '@/shadcn/components/Form';

export default function SidoSelect() {
  const form = useFormContext();
  const { data: cities, isPending } = useSido();

  if (isPending) {
    return <div className="w-[180px] animate-pulse" />;
  }

  return (
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
  );
}
