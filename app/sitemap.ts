import { MetadataRoute } from 'next'
import { properties } from '@/data/properties'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rightpropertyhub.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Property category pages
  const propertyCategories = [
    {
      url: `${baseUrl}/properties/residential`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/commercial`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/vacation`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties/luxury`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties/india`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/dubai`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Individual property pages
  const propertyPages = properties.map((property) => {
    let lastModified = new Date();
    
    // Safely parse updatedAt property
    if (property.updatedAt && property.updatedAt.trim() !== '') {
      const parsedDate = new Date(property.updatedAt);
      // Check if the date is valid
      if (!isNaN(parsedDate.getTime())) {
        lastModified = parsedDate;
      }
    }
    
    return {
      url: `${baseUrl}/properties/${property.type}/${property.id}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: property.featured ? 0.9 : 0.7,
    };
  })

  return [...staticPages, ...propertyCategories, ...propertyPages]
}
