import { PrismaClient, Prisma } from '@prisma/client';
import { SEED_PRODUCTS, SEED_CATEGORIES, SEED_COLLECTIONS, SEED_ARTICLES } from '../src/data/db-seed';
import { DEFAULT_SITE_CONTENT } from '../src/context/StoreContext';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Neon PostgreSQL database seeding for Tracey Kuukua Quansah Atelier...');

  // 1. Seed Categories
  console.log('📁 Seeding categories...');
  for (const cat of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        itemCount: cat.itemCount,
        image: cat.image,
        description: cat.description,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        itemCount: cat.itemCount,
        image: cat.image,
        description: cat.description,
      },
    });
  }

  // 2. Seed Collections
  console.log('✨ Seeding collections...');
  for (const col of SEED_COLLECTIONS) {
    await prisma.collection.upsert({
      where: { id: col.id },
      update: {
        title: col.title,
        subtitle: col.subtitle,
        season: col.season,
        year: col.year,
        coverImage: col.coverImage,
        description: col.description,
        hotspots: col.hotspots as unknown as Prisma.InputJsonValue,
      },
      create: {
        id: col.id,
        title: col.title,
        subtitle: col.subtitle,
        season: col.season,
        year: col.year,
        coverImage: col.coverImage,
        description: col.description,
        hotspots: col.hotspots as unknown as Prisma.InputJsonValue,
      },
    });
  }

  // 3. Seed Products
  console.log('👗 Seeding haute couture creations & garments...');
  for (const prod of SEED_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: {
        name: prod.name,
        subtitle: prod.subtitle,
        category: prod.category,
        categoryId: prod.categoryId,
        collectionId: prod.collectionId,
        priceGhc: prod.priceGhc,
        originalPriceGhc: prod.originalPriceGhc,
        discountPercent: prod.discountPercent,
        isNew: prod.isNew,
        isTrending: prod.isTrending,
        isSpotlight: prod.isSpotlight,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        images: prod.images,
        colors: prod.colors as unknown as Prisma.InputJsonValue,
        sizes: prod.sizes,
        variants: prod.variants as unknown as Prisma.InputJsonValue,
        fabric: prod.fabric,
        craftsmanship: prod.craftsmanship,
        description: prod.description,
        careInstructions: prod.careInstructions,
        stockStatus: prod.stockStatus,
      },
      create: {
        id: prod.id,
        name: prod.name,
        subtitle: prod.subtitle,
        category: prod.category,
        categoryId: prod.categoryId,
        collectionId: prod.collectionId,
        priceGhc: prod.priceGhc,
        originalPriceGhc: prod.originalPriceGhc,
        discountPercent: prod.discountPercent,
        isNew: prod.isNew,
        isTrending: prod.isTrending,
        isSpotlight: prod.isSpotlight,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        images: prod.images,
        colors: prod.colors as unknown as Prisma.InputJsonValue,
        sizes: prod.sizes,
        variants: prod.variants as unknown as Prisma.InputJsonValue,
        fabric: prod.fabric,
        craftsmanship: prod.craftsmanship,
        description: prod.description,
        careInstructions: prod.careInstructions,
        stockStatus: prod.stockStatus,
      },
    });
  }

  // 4. Seed Journal Articles
  console.log('📖 Seeding editorial stories & journal...');
  for (const art of SEED_ARTICLES) {
    await prisma.journalArticle.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        category: art.category,
        author: art.author,
        readTime: art.readTime,
        date: art.date,
        heroImage: art.heroImage,
        excerpt: art.excerpt,
        content: art.content,
        shoppableProductId: art.shoppableProductId,
        tags: art.tags,
      },
      create: {
        id: art.id,
        title: art.title,
        slug: art.slug,
        category: art.category,
        author: art.author,
        readTime: art.readTime,
        date: art.date,
        heroImage: art.heroImage,
        excerpt: art.excerpt,
        content: art.content,
        shoppableProductId: art.shoppableProductId,
        tags: art.tags,
      },
    });
  }

  // 5. Seed Default Site Content (Hero 2-slide & Banners)
  console.log('🎨 Seeding default site CMS content...');
  await prisma.siteContent.upsert({
    where: { id: 'default' },
    update: {
      announcementBarText: DEFAULT_SITE_CONTENT.announcementBarText,
      heroCampaignBadge: DEFAULT_SITE_CONTENT.heroCampaignBadge,
      heroHeadlinePrefix: DEFAULT_SITE_CONTENT.heroHeadlinePrefix,
      heroHeadlineAccent: DEFAULT_SITE_CONTENT.heroHeadlineAccent,
      heroHeadlineSuffix: DEFAULT_SITE_CONTENT.heroHeadlineSuffix,
      heroSubtitle: DEFAULT_SITE_CONTENT.heroSubtitle,
      heroImageUrl: DEFAULT_SITE_CONTENT.heroImageUrl,
      heroPrimaryCta: DEFAULT_SITE_CONTENT.heroPrimaryCta || 'Shop Now',
      heroSecondaryCta: DEFAULT_SITE_CONTENT.heroSecondaryCta || 'Our Story',
      heroPrimaryView: DEFAULT_SITE_CONTENT.heroPrimaryView || 'shop',
      heroSecondaryView: DEFAULT_SITE_CONTENT.heroSecondaryView || 'our-story',
      hero2CampaignBadge: DEFAULT_SITE_CONTENT.hero2CampaignBadge || 'RUNWAY SS26 · BONWIRE ATELIER',
      hero2HeadlinePrefix: DEFAULT_SITE_CONTENT.hero2HeadlinePrefix || 'Ancestral Craft,',
      hero2HeadlineAccent: DEFAULT_SITE_CONTENT.hero2HeadlineAccent || 'Contemporary',
      hero2HeadlineSuffix: DEFAULT_SITE_CONTENT.hero2HeadlineSuffix || ' Soul.',
      hero2Subtitle: DEFAULT_SITE_CONTENT.hero2Subtitle || 'From the looms of Bonwire to the runways of Accra.',
      hero2ImageUrl: DEFAULT_SITE_CONTENT.hero2ImageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
      hero2PrimaryCta: DEFAULT_SITE_CONTENT.hero2PrimaryCta || 'Explore Collections',
      hero2SecondaryCta: DEFAULT_SITE_CONTENT.hero2SecondaryCta || 'View Lookbook',
      hero2PrimaryView: DEFAULT_SITE_CONTENT.hero2PrimaryView || 'collections',
      hero2SecondaryView: DEFAULT_SITE_CONTENT.hero2SecondaryView || 'collections',
      heroSlideDuration: DEFAULT_SITE_CONTENT.heroSlideDuration || 5,
      heroAutoplay: DEFAULT_SITE_CONTENT.heroAutoplay !== false,
      heroTransitionEffect: DEFAULT_SITE_CONTENT.heroTransitionEffect || 'crossfade',
      bannerVisible: DEFAULT_SITE_CONTENT.bannerVisible,
      bannerBadge: DEFAULT_SITE_CONTENT.bannerBadge,
      bannerHeadline: DEFAULT_SITE_CONTENT.bannerHeadline,
      bannerSubtitle: DEFAULT_SITE_CONTENT.bannerSubtitle,
      bannerDiscountText: DEFAULT_SITE_CONTENT.bannerDiscountText,
    },
    create: {
      id: 'default',
      announcementBarText: DEFAULT_SITE_CONTENT.announcementBarText,
      heroCampaignBadge: DEFAULT_SITE_CONTENT.heroCampaignBadge,
      heroHeadlinePrefix: DEFAULT_SITE_CONTENT.heroHeadlinePrefix,
      heroHeadlineAccent: DEFAULT_SITE_CONTENT.heroHeadlineAccent,
      heroHeadlineSuffix: DEFAULT_SITE_CONTENT.heroHeadlineSuffix,
      heroSubtitle: DEFAULT_SITE_CONTENT.heroSubtitle,
      heroImageUrl: DEFAULT_SITE_CONTENT.heroImageUrl,
      heroPrimaryCta: DEFAULT_SITE_CONTENT.heroPrimaryCta || 'Shop Now',
      heroSecondaryCta: DEFAULT_SITE_CONTENT.heroSecondaryCta || 'Our Story',
      heroPrimaryView: DEFAULT_SITE_CONTENT.heroPrimaryView || 'shop',
      heroSecondaryView: DEFAULT_SITE_CONTENT.heroSecondaryView || 'our-story',
      hero2CampaignBadge: DEFAULT_SITE_CONTENT.hero2CampaignBadge || 'RUNWAY SS26 · BONWIRE ATELIER',
      hero2HeadlinePrefix: DEFAULT_SITE_CONTENT.hero2HeadlinePrefix || 'Ancestral Craft,',
      hero2HeadlineAccent: DEFAULT_SITE_CONTENT.hero2HeadlineAccent || 'Contemporary',
      hero2HeadlineSuffix: DEFAULT_SITE_CONTENT.hero2HeadlineSuffix || ' Soul.',
      hero2Subtitle: DEFAULT_SITE_CONTENT.hero2Subtitle || 'From the looms of Bonwire to the runways of Accra.',
      hero2ImageUrl: DEFAULT_SITE_CONTENT.hero2ImageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
      hero2PrimaryCta: DEFAULT_SITE_CONTENT.hero2PrimaryCta || 'Explore Collections',
      hero2SecondaryCta: DEFAULT_SITE_CONTENT.hero2SecondaryCta || 'View Lookbook',
      hero2PrimaryView: DEFAULT_SITE_CONTENT.hero2PrimaryView || 'collections',
      hero2SecondaryView: DEFAULT_SITE_CONTENT.hero2SecondaryView || 'collections',
      heroSlideDuration: DEFAULT_SITE_CONTENT.heroSlideDuration || 5,
      heroAutoplay: DEFAULT_SITE_CONTENT.heroAutoplay !== false,
      heroTransitionEffect: DEFAULT_SITE_CONTENT.heroTransitionEffect || 'crossfade',
      bannerVisible: DEFAULT_SITE_CONTENT.bannerVisible,
      bannerBadge: DEFAULT_SITE_CONTENT.bannerBadge,
      bannerHeadline: DEFAULT_SITE_CONTENT.bannerHeadline,
      bannerSubtitle: DEFAULT_SITE_CONTENT.bannerSubtitle,
      bannerDiscountText: DEFAULT_SITE_CONTENT.bannerDiscountText,
    },
  });

  console.log('✅ Neon database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
