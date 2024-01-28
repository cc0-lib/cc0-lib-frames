import { SITE_URL } from "@/lib/constant";
import { getImage } from "@/lib/get-image";

export const revalidate = 1;

export const generateMetadata = async () => {
  return {
    title: "Random CC0-LIB Image",
    description: "cc0-lib random image + frames integration",
    openGraph: {
      title: "cc0-lib-frames",
      description: "cc0-lib random image + frames integration",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/api/image`,
          width: 1200,
          height: 630,
          alt: "cc0-lib-frames",
        },
      ],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:button:1": "Random CC0 Content",
      "fc:frame:post_url": `${SITE_URL}/api/image`,
      "fc:frame:image": `${SITE_URL}/api/image`,
    },
  };
};

export default async function Home() {
  const imageUrl = await getImage();

  if (!imageUrl) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>NO IMAGE FOUND</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <img
        src={imageUrl as string}
        alt="random cc0-content"
        className="max-h-screen w-auto h-full"
      />
    </main>
  );
}
