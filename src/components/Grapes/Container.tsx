import { GrapesComponent } from "@/interfaces";
import { ReactNode, memo, useMemo } from "react";

import { pick } from "lodash";
import Dropdown from "./Dropdown";
import TagName from "./TagName";

interface ContainerProps {
  component: GrapesComponent;
  onParseComponents: (components: GrapesComponent[]) => ReactNode;
}

const Container = ({ component, onParseComponents }: ContainerProps) => {
  const { attributes, classes = [], components, content, name, tagName, type } = component;
  const as = useMemo(() => {
    if (tagName) return tagName;

    return "div";
  }, [tagName]);
  const validAttributeKeys = useMemo(() => ["id", "src", "title"], []);

  if (name && name.toLowerCase() === "navigation menu item") {
    console.log(component);

    return (
      <Dropdown
        className={classes.join(" ")}
        components={components}
        {...pick(attributes, validAttributeKeys)}
      />
    );
  }

  return (
    <TagName as={as} className={classes.join(" ")} {...pick(attributes, validAttributeKeys)}>
      {!!components.length && onParseComponents(components)}
      {!components.length && (content as string)}
    </TagName>
  );
};

export default memo(Container);
