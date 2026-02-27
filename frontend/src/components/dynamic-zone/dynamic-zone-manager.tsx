import React from "react";
import { IllustrationSection } from "./illustration-section";
import { RichText } from "./rich-text";
import { Gallery } from "./gallery";
import { CtaBanner } from "./cta-banner";
import { KeyFacts } from "./key-facts";
import { Quote } from "./quote";

interface DynamicZoneComponent {
  __component: string;
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

interface Props {
  dynamicZone?: DynamicZoneComponent[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMapping: Record<string, React.ComponentType<any>> = {
  "dynamic-zone.illustration-section": IllustrationSection,
  "dynamic-zone.rich-text": RichText,
  "dynamic-zone.gallery": Gallery,
  "dynamic-zone.cta-banner": CtaBanner,
  "dynamic-zone.key-facts": KeyFacts,
  "dynamic-zone.quote": Quote,
};

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone }) => {
  if (!dynamicZone?.length) return null;

  return (
    <div>
      {dynamicZone.map((componentData, index) => {
        const Component = componentMapping[componentData.__component];
        if (!Component) {
          console.warn(`No component found for: ${componentData.__component}`);
          return null;
        }
        return (
          <Component
            key={`${componentData.__component}-${componentData.id}-${index}`}
            {...componentData}
          />
        );
      })}
    </div>
  );
};

export default DynamicZoneManager;
