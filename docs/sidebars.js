/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  decashSidebar: [
    {
      type: 'html',
      className: 'sidebar-title',
      value: 'DECASH DOCUMENTATION',
      defaultStyle: true,
    },
    'welcome',
    //Section "Getting started "
    {
      type: 'category',
      label: 'Getting started',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        {
          type: 'doc',
          label: 'Welcome to DeCash',
          id: 'getting-started/welcome-to-decash',
        },
        {
          type: 'doc',
          label: 'Concepts',
          id: 'getting-started/concepts',
        },
      ],
    },
    //Section "About"
    {
      type: 'category',
      label: 'About',
      link: {
        type: 'doc',
        id: 'about/index',
      },
      items: [
        {
          type: 'doc',
          label: 'What is DeCash',
          id: 'about/what-is-decash',
        },
        {
          type: 'doc',
          label: 'Roadmap',
          id: 'about/roadmap',
        },
        {
          type: 'doc',
          label: 'Polygon AggLayer',
          id: 'about/polygon-agglayer',
        },
      ],
    },
    //Section "User guide"
    {
      type: 'category',
      label: 'User guide',
      link: {
        type: 'doc',
        id: 'user-guide/index',
      },
      items: [
        {
          type: 'doc',
          label: 'Create a link',
          id: 'user-guide/create-link',
        },
        {
          type: 'doc',
          label: 'Claim a link',
          id: 'user-guide/claim-link',
        },
        {
          type: 'doc',
          label: 'Swap chain',
          id: 'user-guide/swap-chain',
        },
      ],
    },

  ],
};

export default sidebars;
