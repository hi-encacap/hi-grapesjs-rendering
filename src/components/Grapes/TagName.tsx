import { Fragment, ReactNode, memo } from "react";

interface TagNameProps extends Record<string, unknown> {
  as: string;
  children: ReactNode;
}

const TagName = ({ as, children, ...props }: TagNameProps) => {
  if (as === "wrapper") {
    return <Fragment>{children}</Fragment>;
  }

  if (as === "swiper-container") {
    return <swiper-container {...props}>{children}</swiper-container>;
  }

  if (as === "swiper-slide") {
    return <swiper-slide {...props}>{children}</swiper-slide>;
  }

  if (as === "img") {
    return <img {...props} />;
  }

  if (as === "text") {
    return <p {...props}>{children}</p>;
  }

  return <div {...props}>{children}</div>;
};

export default memo(TagName);
