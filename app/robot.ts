import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // Blocks Google from showing your admin page
    },
    // Replace with your actual Vercel URL
    sitemap: 'https://techtonic-shop.vercel.app', 
  }
}