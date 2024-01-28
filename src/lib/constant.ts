const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "https://hollywood-cl-freelance-tasks.trycloudflare.com" ||
      "http://localhost:1333"
    : process.env.NEXT_PUBLIC_VERCEL_URL;

export { SITE_URL };
