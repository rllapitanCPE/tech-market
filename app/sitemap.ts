import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://techtonic-shop.vercel.app', // Replace with your URL
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // If you ever add a /contact or /about page, add them here too
  ]
}