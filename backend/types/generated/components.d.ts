import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksButton extends Struct.ComponentSchema {
  collectionName: 'components_blocks_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    isLink: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    link: Schema.Attribute.Component<'blocks.link', false>;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface BlocksFooterCategory extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footer_categories';
  info: {
    displayName: 'FooterCategory';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface BlocksLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    target: Schema.Attribute.Enumeration<
      ['none', '_blank', '_self', '_parent', '_top']
    >;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksParagraph extends Struct.ComponentSchema {
  collectionName: 'components_blocks_paragraphs';
  info: {
    displayName: 'Paragraph';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTitle extends Struct.ComponentSchema {
  collectionName: 'components_blocks_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    as: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DynamicZoneIllustrationSection extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_illustration_sections';
  info: {
    displayName: 'IllustrationSection';
  };
  attributes: {
    paragraph: Schema.Attribute.Component<'blocks.paragraph', false>;
    title: Schema.Attribute.Component<'blocks.title', false>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    categories: Schema.Attribute.Component<'blocks.footer-category', true>;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    test: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.button': BlocksButton;
      'blocks.footer-category': BlocksFooterCategory;
      'blocks.link': BlocksLink;
      'blocks.paragraph': BlocksParagraph;
      'blocks.title': BlocksTitle;
      'dynamic-zone.illustration-section': DynamicZoneIllustrationSection;
      'layout.footer': LayoutFooter;
      'layout.navbar': LayoutNavbar;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
