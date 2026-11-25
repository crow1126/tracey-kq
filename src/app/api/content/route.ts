import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_SITE_CONTENT } from '@/context/StoreContext';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ content: DEFAULT_SITE_CONTENT, source: 'default' });
    }
    const content = await prisma.siteContent.findUnique({
      where: { id: 'default' },
    });
    return NextResponse.json({ content: content || DEFAULT_SITE_CONTENT, source: 'neon' });
  } catch (error) {
    console.error('Error fetching site content from Neon:', error);
    return NextResponse.json({ content: DEFAULT_SITE_CONTENT, source: 'fallback_default' });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Saved in offline mode', content: data });
    }
    const content = await prisma.siteContent.upsert({
      where: { id: 'default' },
      update: {
        announcementBarText: data.announcementBarText,
        heroCampaignBadge: data.heroCampaignBadge,
        heroHeadlinePrefix: data.heroHeadlinePrefix,
        heroHeadlineAccent: data.heroHeadlineAccent,
        heroHeadlineSuffix: data.heroHeadlineSuffix,
        heroSubtitle: data.heroSubtitle,
        heroImageUrl: data.heroImageUrl,
        heroPrimaryCta: data.heroPrimaryCta,
        heroSecondaryCta: data.heroSecondaryCta,
        heroPrimaryView: data.heroPrimaryView,
        heroSecondaryView: data.heroSecondaryView,
        hero2CampaignBadge: data.hero2CampaignBadge,
        hero2HeadlinePrefix: data.hero2HeadlinePrefix,
        hero2HeadlineAccent: data.hero2HeadlineAccent,
        hero2HeadlineSuffix: data.hero2HeadlineSuffix,
        hero2Subtitle: data.hero2Subtitle,
        hero2ImageUrl: data.hero2ImageUrl,
        hero2PrimaryCta: data.hero2PrimaryCta,
        hero2SecondaryCta: data.hero2SecondaryCta,
        hero2PrimaryView: data.hero2PrimaryView,
        hero2SecondaryView: data.hero2SecondaryView,
        heroSlideDuration: Number(data.heroSlideDuration || 5),
        heroAutoplay: Boolean(data.heroAutoplay !== false),
        heroTransitionEffect: data.heroTransitionEffect || 'crossfade',
        bannerVisible: Boolean(data.bannerVisible),
        bannerBadge: data.bannerBadge,
        bannerHeadline: data.bannerHeadline,
        bannerSubtitle: data.bannerSubtitle,
        bannerDiscountText: data.bannerDiscountText,
      },
      create: {
        id: 'default',
        announcementBarText: data.announcementBarText,
        heroCampaignBadge: data.heroCampaignBadge,
        heroHeadlinePrefix: data.heroHeadlinePrefix,
        heroHeadlineAccent: data.heroHeadlineAccent,
        heroHeadlineSuffix: data.heroHeadlineSuffix,
        heroSubtitle: data.heroSubtitle,
        heroImageUrl: data.heroImageUrl,
        heroPrimaryCta: data.heroPrimaryCta,
        heroSecondaryCta: data.heroSecondaryCta,
        heroPrimaryView: data.heroPrimaryView,
        heroSecondaryView: data.heroSecondaryView,
        hero2CampaignBadge: data.hero2CampaignBadge,
        hero2HeadlinePrefix: data.hero2HeadlinePrefix,
        hero2HeadlineAccent: data.hero2HeadlineAccent,
        hero2HeadlineSuffix: data.hero2HeadlineSuffix,
        hero2Subtitle: data.hero2Subtitle,
        hero2ImageUrl: data.hero2ImageUrl,
        hero2PrimaryCta: data.hero2PrimaryCta,
        hero2SecondaryCta: data.hero2SecondaryCta,
        hero2PrimaryView: data.hero2PrimaryView,
        hero2SecondaryView: data.hero2SecondaryView,
        heroSlideDuration: Number(data.heroSlideDuration || 5),
        heroAutoplay: Boolean(data.heroAutoplay !== false),
        heroTransitionEffect: data.heroTransitionEffect || 'crossfade',
        bannerVisible: Boolean(data.bannerVisible),
        bannerBadge: data.bannerBadge,
        bannerHeadline: data.bannerHeadline,
        bannerSubtitle: data.bannerSubtitle,
        bannerDiscountText: data.bannerDiscountText,
      },
    });
    return NextResponse.json({ success: true, content });
  } catch (error: unknown) {
    console.error('Error updating site content:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
