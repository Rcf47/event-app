import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { useState } from "react";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

function Dropdown({ value, onChangeHandler }: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <SelectItem
                key={category._id}
                value={category.id}
                className="select-item p-regular-14"
              >
                {category.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}

export default Dropdown;
