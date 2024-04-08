import { getServerSideSitemap } from "next-sitemap";

import type { IConfig } from "next-sitemap";

import { articleCategoryService } from "@/services/server";
import { appConfig } from "@/utils/config";

// export async function GET(request: Request) {
export async function GET() {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
  const { locales } = appConfig;

  const articleCategories = await articleCategoryService.getAllPublic();
  const articleCategorySidemaps = articleCategories.flatMap((articleCategory) =>
    locales.map((locale) => ({
      loc: `${siteURL}/${locale}/articles/${articleCategory.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily" as IConfig["changefreq"],
      priority: 0.7,
    })),
  );

  return getServerSideSitemap([...articleCategorySidemaps]);
}
