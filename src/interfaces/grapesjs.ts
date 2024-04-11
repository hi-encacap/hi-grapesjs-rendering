import { CSSProperties } from "react";

interface GrapesComponent {
  attributes?: Record<string, string>;
  classes?: string[];
  components?: GrapesComponent[];
  content?: unknown;
  stylable?: string[];
  type: string;
  name?: string;
  tagName?: string;
}

interface GrapesFrame {
  id: string;
  component: GrapesComponent;
}

interface GrapesProjectStyle {
  selectors: Array<Record<string, string> | string>;
  style: CSSProperties;
  mediaText?: string;
  atRuleType?: string;
}

interface GrapesPage {
  id: string;
  frames: GrapesFrame[];
}

interface GrapesProjectData {
  styles: Array<GrapesProjectStyle | string>;
  pages: GrapesPage[];
}

export type { GrapesComponent, GrapesFrame, GrapesPage, GrapesProjectData, GrapesProjectStyle };
