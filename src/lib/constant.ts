const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "https://hollywood-cl-freelance-tasks.trycloudflare.com" ||
      "http://localhost:1333"
    : "https://random.cc0-lib.wtf";

export { SITE_URL };
