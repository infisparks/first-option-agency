import { MetadataRoute } from 'next';
import { BLOG_POSTS } from './constants/blogs';
import { SERVICES } from './constants/services';

const DOMAIN = 'https://firstoptionagency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${DOMAIN}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceEntries = SERVICES.map((service) => ({
    url: `${DOMAIN}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const locationEntries = ['global', 'india', 'usa', 'middle-east', 'europe'].map((loc) => ({
    url: `${DOMAIN}/locations/${loc}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${DOMAIN}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/funnels`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/funnels/alumina-residue`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceEntries,
    ...blogEntries,
    ...locationEntries,
  ];
}
