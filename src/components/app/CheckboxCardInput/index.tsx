import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CheckboxCardInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "id"
> & { id: string; title: string; description: string };

export const CheckboxCardInput: React.FC<CheckboxCardInputProps> = ({
  id,
  title,
  description,
  ...rest
}) => {
  return (
    <div>
      <Input {...rest} id={id} type="checkbox" className="peer sr-only" />

      <Label htmlFor={id} className="peer-checked:[&>div]:border-black">
        <div className="border rounded-md p-3 cursor-pointer">
          <h3 className="font-medium text-sm mb-1">{title}</h3>

          <p className="text-xs text-gray-500 font-normal">{description}</p>
        </div>
      </Label>
    </div>
  );
};
