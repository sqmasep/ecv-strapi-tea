"use client";

import dynamic from "next/dynamic";
import React from "react";

interface DynamicZoneComponent {
  __component: string;
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
}

const componentMapping: { [key: string]: any } = {
  // "shared.card": dynamic(() => import("./card").then(mod => mod.Card)),
  // "shared.paragraph": dynamic(() =>
  //   import("./paragraph").then(mod => mod.Paragraph),
  // ),
  // "dynamic-zone.illustration-section": dynamic(() =>
  //   import("./illustration-section").then(mod => mod.IllustrationSection),
  // ),
};

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone }) => {
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
