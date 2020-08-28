const FEATURED_PROJECTS = [
  {
    path: 'https://50reactprojects.com/',
    title: '50 Projects for React & the Static Web',
    category: 'Free ebook with 50 project ideas'
  },
  {
    path: 'https://github.com/colbyfayock/gatsby-starter-leaflet',
    title: 'Gatsby Leaflet Starter',
    category: 'Quickly bootstrap a mapping app with Leaflet'
  },
];

export default function useProjects() {
  return {
    projects: FEATURED_PROJECTS,
    toAll: '/all-projects'
  };
}