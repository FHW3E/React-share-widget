import type { Network } from "./types";
import { safeEncode } from "./utils";

export interface SharePayload {
  url: string;
  title: string;
  text: string;
  description: string;
  subject: string;
  facebookAppId?: string;
}

const withUrlAndText = (baseUrl: string, url: string, text: string): string =>
  `${baseUrl}${safeEncode(text)}%20${safeEncode(url)}`;

export const buildShareUrl = (network: Network, payload: SharePayload): string => {
  const { url, title, text, description, subject, facebookAppId } = payload;

  switch (network) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${safeEncode(url)}&text=${safeEncode(text)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${safeEncode(url)}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${safeEncode(url)}`;
    case "reddit":
      return `https://www.reddit.com/submit?url=${safeEncode(url)}&title=${safeEncode(title)}`;
    case "pinterest":
      return `https://pinterest.com/pin/create/button/?url=${safeEncode(url)}&description=${safeEncode(description || text)}`;
    case "facebook-messenger":
      // NOTE: Facebook Messenger share dialog uses `app_id` from a Facebook App.
      return facebookAppId
        ? `https://www.facebook.com/dialog/send?link=${safeEncode(url)}&app_id=${safeEncode(
            facebookAppId
          )}&redirect_uri=${safeEncode(url)}`
        : `https://www.facebook.com/dialog/send?link=${safeEncode(url)}&redirect_uri=${safeEncode(
            url
          )}`;
    case "hacker-news":
      return `https://news.ycombinator.com/submitlink?u=${safeEncode(url)}&t=${safeEncode(title)}`;
    case "flipboard":
      return `https://share.flipboard.com/bookmarklet/popout?v=2&title=${safeEncode(title)}&url=${safeEncode(url)}`;
    case "evernote":
      return `https://www.evernote.com/clip.action?url=${safeEncode(url)}&title=${safeEncode(title)}`;
    case "threads":
      return `https://threads.net/intent/post?text=${safeEncode(text)}%20${safeEncode(url)}`;
    case "bluesky":
      return `https://bsky.app/intent/compose?text=${safeEncode(text)}%20${safeEncode(url)}`;
    case "tumblr":
      return `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${safeEncode(url)}&title=${safeEncode(title)}&caption=${safeEncode(description)}`;
    case "whatsapp":
      return withUrlAndText("https://api.whatsapp.com/send?text=", url, text);
    case "telegram":
      return `https://t.me/share/url?url=${safeEncode(url)}&text=${safeEncode(text)}`;
    case "email":
      return `mailto:?subject=${safeEncode(subject || title)}&body=${safeEncode(text)}%20${safeEncode(url)}`;
    case "text-message":
      // SMS intent (best-effort; support varies across platforms)
      return `sms:?body=${safeEncode(text)}%20${safeEncode(url)}`;
    case "copy-link":
      return "";
    default:
      return url;
  }
};
