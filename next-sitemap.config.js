/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hafizabubakarafzal.vercel.app',
  generateRobotsTxt: false, // we already have a static robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  // Exclude certain paths if needed
  exclude: ['/404', '/admin/*'],
  // Optional: add additional URLs (like dynamic routes)
  additionalPaths: async (config) => {
    // If you have dynamic pages (e.g., /blog/[slug]), fetch them here
    // Example: return [{ loc: '/blog/hello-world', lastmod: new Date().toISOString() }]
    return [];
  },
  // Transform priority/frequency per path if needed
  transform: (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};