import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { unstable_setRequestLocale } from "next-intl/server";
import { memo } from "react";

import { QueryKey } from "@/constants/query-key";
import { webpageService } from "@/services/server";

import Script from "next/script";
import Home from "./components/Home";

const HomePage = async ({ params: { locale } }: BasePageProps) => {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.WEBPAGE_PROJECT_DATA],
    queryFn: webpageService.getProjectData,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js" />
    </>
  );
};

export default memo(HomePage);
