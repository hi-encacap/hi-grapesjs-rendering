import { GrapesComponent } from "@/interfaces";
import { HTMLAttributes, memo } from "react";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  components: GrapesComponent[];
}

const Dropdown = ({ components, ...props }: DropdownProps) => {
  // console.log(components);

  return <div {...props}>Dropdown</div>;
};

export default memo(Dropdown);
