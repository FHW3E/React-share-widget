export const safeEncode = (value: string): string => encodeURIComponent(value);

export const joinClassNames = (...values: Array<string | false | undefined>): string =>
  values.filter(Boolean).join(" ");

export const getDefaultShareMeta = (): { url: string; title: string; description: string } => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      url: "",
      title: "",
      description: ""
    };
  }

  const url = window.location.href;
  const title = document.title || "";
  const metaDescription =
    document.querySelector('meta[name="description"]')?.getAttribute("content") || "";

  return {
    url,
    title,
    description: metaDescription
  };
};
