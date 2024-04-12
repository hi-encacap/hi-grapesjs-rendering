import { GrapesContainer, GrapesStyle } from "@/components";
import { GrapesComponent, GrapesFrame, GrapesProjectData } from "@/interfaces";
import { get } from "lodash";

const parseComponents = (components: GrapesComponent[] = []) => {
  if (!components.length) return null;

  return components.map((component) => {
    const { attributes } = component;
    const key = get(attributes, "attributes", Math.random());

    return <GrapesContainer component={component} key={key} onParseComponents={parseComponents} />;
  });
};

const parseFrame = (frame: GrapesFrame) => {
  const { component } = frame;

  return (
    <GrapesContainer
      key={get(component.attributes, "id", Math.random())}
      component={component}
      onParseComponents={parseComponents}
    />
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
