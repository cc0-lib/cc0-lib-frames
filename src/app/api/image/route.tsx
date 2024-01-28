import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constant";

export const dynamic = "force-dynamic";

const headers = {
  "Content-Type": "text/html",
};

const html = (url?: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <title>Random CC0 Content</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <meta property="og:title" content="Random CC0 Content">
      <meta property="og:image" content="${url}">
      <meta name="fc:frame" content="vNext">
      <meta name="fc:frame:image" content="${url}">
      <meta name="fc:frame:post_url" content="${SITE_URL}/api/image">
      <meta name="fc:frame:button:1" content="Random CC0 Content">
    </head>
    <body class="flex min-h-screen flex-col items-center justify-center">
      <img src="${url}" alt="random cc0-content" class="max-h-screen w-auto h-full"/>
    </body>
  </html>
  `;
};

export const getImage = async () => {
  const data = await fetch("https://cc0-lib.wtf/api/random");

  if (!data.ok) {
    return new NextResponse("No random data", {
      status: 404,
      headers,
    });
  }

  const { image } = await data.json();

  if (!image) {
    return new NextResponse("No image found", {
      status: 404,
      headers,
    });
  }

  const timestamp = Date.now();

  // return image url with timestamp to avoid caching
  const imageUrl = `${image.url}?${timestamp}`;

  return imageUrl;
};

export const GET = async (req: NextRequest) => {
  const imageUrl = await getImage();

  const loadImage = await fetch(imageUrl as string);

  if (!loadImage.ok) {
    return new NextResponse("No image found", {
      status: 404,
      headers,
    });
  }
  const blob = await loadImage.blob();

  if (!blob) {
    return new NextResponse("converting failed", {
      status: 404,
      headers,
    });
  }

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=10",
    },
  });
};

export const POST = async (req: NextRequest) => {
  const imageUrl = await getImage();

  return new NextResponse(html(imageUrl as string), {
    headers,
  });
};
