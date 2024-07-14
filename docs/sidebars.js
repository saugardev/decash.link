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
      value: 'GETTING STARTED',
      defaultStyle: true,
    },
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
    {
      type: 'html',
      className: 'sidebar-title',
      value: 'ABOUT',
      defaultStyle: true,
    },


    //Section "About"
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


    //Section "User guide"
    {
      type: 'html',
      className: 'sidebar-title',
      value: 'USER GUIDE',
      defaultStyle: true,
    },
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

    //Section "Chronicle"
    {
      type: 'html',
      className: 'sidebar-title',
      value: 'CHRONICLE',
      defaultStyle: true,
    },
    {
      type: 'doc',
      label: 'Implementing Chronicle',
      id: 'chronicle/implementing-chronicle',
    },
      
  ],
};

export default sidebars;
