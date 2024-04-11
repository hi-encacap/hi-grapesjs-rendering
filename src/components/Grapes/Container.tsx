import { GrapesComponent, GrapesProjectStyle } from "@/interfaces";
import { get, kebabCase, lowerCase, omit } from "lodash";
import { Fragment, ReactNode, memo, useMemo } from "react";

interface ContainerProps extends Record<string, unknown>, Omit<GrapesComponent, "components"> {
  children: ReactNode;
  styles?: GrapesProjectStyle[];
}

const Container = ({
  attributes,
  classes = [],
  content,
  children,
  name,
  type,
  tagName,
  ...props
}: ContainerProps) => {
  const className = useMemo(() => classes.join(" ") || undefined, [classes]);
  const kebabProps = useMemo(() => {
    return Object.keys(props).reduce(
      (acc, key) => {
        acc[kebabCase(key)] = props[key];
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }, [props]);

  const as = useMemo(() => tagName || type || lowerCase(name), [name, type, tagName]);
  const id = useMemo(() => get(attributes, "id", String(Math.random())), [attributes]);

  if (as === "wrapper") {
    return <Fragment>{children}</Fragment>;
  }

  if (as === "swiper-container") {
    return (
      <swiper-container {...kebabProps} {...omit(attributes, "category", "id")}>
        {children}
      </swiper-container>
    );
  }

  if (as === "swiper-slide") {
    return <swiper-slide {...kebabProps}>{children}</swiper-slide>;
  }

  if (as === "image" || as === "img") {
    return <img className={className} {...attributes} />;
  }

  if (as === "text") {
    return (
      <p id={id} className={className} {...kebabProps} {...attributes}>
        {children ?? (content as string)}
      </p>
    );
  }

  return (
    <div id={id} className={className} {...kebabProps}>
      {(content as ReactNode) ?? children}
    </div>
  );
};

export default memo(Container);
