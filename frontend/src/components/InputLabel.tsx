import type { SyntheticEvent } from "react";
import { Input } from "./ui/input";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: SyntheticEvent) => void;
}

export function InputLabel({ label, placeholder, value, onChange }: Props) {
  return (
    <label>
      {label}
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </label>
  );
}
