import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="mt-1 w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100 bg-white">
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="entrepreneur">startup</SelectItem>
          <SelectItem value="investor">investor</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
