"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { memo } from "react";

import { QueryKey } from "@/constants/query-key";
import { webpageService } from "@/services/server";

import { GrapesProjectData } from "@/interfaces";
import { parseProjectData } from "@/utils/grapesjs";

const Home = () => {
  const { data, isError } = useQuery({
    queryKey: [QueryKey.WEBPAGE_PROJECT_DATA],
    queryFn: webpageService.getProjectData,
  });

  if (isError) {
    notFound();
  }

  const { body, style } = parseProjectData(data as unknown as GrapesProjectData);

  return (
    <>
      {style}
      {body}
    </>
  );
};

export default memo(Home);
