import { GrapesContainer, GrapesStyle } from "@/components";
import { GrapesComponent, GrapesFrame, GrapesProjectData } from "@/interfaces";
import { get } from "lodash";

const parseComponents = (components: GrapesComponent[] = []) => {
  if (!components.length) return null;

  return components.map((component) => {
    const { components, attributes, classes, content, name, type, tagName } = component;
    const key = get(component, "attributes.id", Math.random());

    // if (name?.includes("Menu Item")) {
    //   console.log("navigation", component);
    // }

    return (
      <GrapesContainer
        attributes={attributes}
        classes={classes}
        content={content}
        key={key}
        name={name}
        type={type}
        tagName={tagName}
      >
        {components && parseComponents(components)}
      </GrapesContainer>
    );
  });
};

const parseFrame = (frame: GrapesFrame) => {
  const { component, id } = frame;

  return (
    <div key={id || Math.random()}>
      <GrapesContainer type={component.type}>{parseComponents(component.components)}</GrapesContainer>
    </div>
  );
};

const parseFrames = (frames: GrapesFrame[]) => {
  return frames.map((frame) => parseFrame(frame));
};

const parseStyles = (styles: GrapesProjectData["styles"]) => {
  return <GrapesStyle styles={styles} />;
};

const parseProjectData = (data: GrapesProjectData) => {
  const { pages } = data;

  return {
    body: parseFrames(pages[0].frames),
    style: parseStyles(data.styles),
  };
};

export { parseFrame, parseFrames, parseProjectData, parseStyles };
