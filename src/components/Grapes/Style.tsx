import { GrapesProjectData } from "@/interfaces";
import { memo, useMemo } from "react";

interface GrapesStyleProps {
  styles: GrapesProjectData["styles"];
}

const GrapesStyle = ({ styles }: GrapesStyleProps) => {
  const parsedStyle = useMemo(
    () =>
      styles.map((item) => {
        if (typeof item === "string") return item;

        const { selectors, style: itemStyle, mediaText, atRuleType } = item;
        const parsedSelectors = selectors
          .map((selector) => {
            if (typeof selector === "string") return selector;
          })
          .join(", ");
        const parsedValue = Object.entries(itemStyle)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ");

        if (!mediaText) {
          return `${parsedSelectors} { ${parsedValue} }`;
        }

        return `@${atRuleType} screen and ${mediaText} { ${parsedSelectors} { ${parsedValue} } }`;
      }),
    [styles],
  );

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: parsedStyle.join(""),
      }}
    />
  );
};

export default memo(GrapesStyle);
