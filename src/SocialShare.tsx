import { useMemo, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { buildShareUrl } from "./shareUrls";
import type { Network, SocialShareProps } from "./types";
import { getDefaultShareMeta, joinClassNames } from "./utils";
import { CustomNetworkIcon } from "./icons/CustomNetworkIcon";
import styles from "./SocialShare.module.css";

const DEFAULT_NETWORKS: Network[] = ["x", "facebook", "linkedin"];

const NETWORK_LABELS: Record<Network, string> = {
  x: "X",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  reddit: "Reddit",
  pinterest: "Pinterest",
  email: "Email",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  "text-message": "Text message",
  "facebook-messenger": "Facebook Messenger",
  "hacker-news": "Hacker News",
  "copy-link": "Copy link",
  flipboard: "Flipboard",
  evernote: "Evernote",
  threads: "Threads",
  bluesky: "Bluesky",
  tumblr: "Tumblr"
};

const BRAND_COLORS: Record<Network, string> = {
  x: "#000000",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  reddit: "#FF4500",
  pinterest: "#E60023",
  email: "#6B7280",
  whatsapp: "#25D366",
  telegram: "#2AABEE",
  "text-message": "#34C759",
  "facebook-messenger": "#0084FF",
  "hacker-news": "#FF6600",
  "copy-link": "#64748B",
  flipboard: "#E12828",
  evernote: "#2DBE60",
  threads: "#101010",
  bluesky: "#1185FE",
  tumblr: "#36465D"
};

const SIZE_MAP = {
  sm: 34,
  md: 42,
  lg: 52
} as const;

const CUSTOM_ICON_NETWORKS = new Set<Network>([
  "facebook-messenger",
  "hacker-news",
  "flipboard",
  "evernote",
  "text-message",
  "copy-link"
]);

// react-social-icons internal icon keys differ slightly from our Network values.
const REACT_SOCIAL_ICON_NETWORK_KEY: Partial<Record<Network, string>> = {
  x: "x",
  facebook: "facebook",
  linkedin: "linkedin",
  reddit: "reddit",
  pinterest: "pinterest",
  email: "mailto",
  whatsapp: "whatsapp",
  telegram: "telegram",
  threads: "threads",
  bluesky: "bsky.app",
  tumblr: "tumblr"
};

export const SocialShare = ({
  networks = DEFAULT_NETWORKS,
  url,
  title,
  text,
  description,
  subject,
  facebookAppId,
  messageText,
  buttonBgColor,
  iconFgColor,
  layout = "inline",
  floatingSide = "right",
  theme = "brand",
  size = "md",
  className,
  iconOnly = true
}: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const fallbackMeta = getDefaultShareMeta();
  const resolvedUrl = url || fallbackMeta.url;
  const resolvedTitle = title || fallbackMeta.title;
  const resolvedDescription = description || fallbackMeta.description || resolvedTitle;
  const resolvedText = text || resolvedTitle;
  const resolvedSubject = subject || resolvedTitle;
  const pixelSize = SIZE_MAP[size];

  const listClassName = useMemo(
    () =>
      joinClassNames(
        styles.list,
        styles[layout],
        styles[theme],
        styles[size],
        layout === "floating" && styles[floatingSide],
        className
      ),
    [className, floatingSide, layout, size, theme]
  );

  return (
    <div className={listClassName} aria-label="Social share links">
      {networks.map((network) => {
        const reactIconKey = REACT_SOCIAL_ICON_NETWORK_KEY[network];
        const shouldUseCustomIcon = CUSTOM_ICON_NETWORKS.has(network) || !reactIconKey;
        const canUseReactSocialIcon = !!reactIconKey && !shouldUseCustomIcon;

        const networkText = network === "text-message" ? (messageText || resolvedText) : resolvedText;

        const shareUrl = buildShareUrl(network, {
          url: resolvedUrl,
          title: resolvedTitle,
          text: networkText,
          description: resolvedDescription,
          subject: resolvedSubject,
          facebookAppId
        });

        const baseLabel = NETWORK_LABELS[network];
        const label = `Share on ${baseLabel}`;
        const buttonColor = BRAND_COLORS[network];

        // For custom anchors only: avoid using target=_blank for non-http schemes (mailto/sms).
        const isHttpUrl = /^https?:\/\//i.test(shareUrl);
        const linkProps = isHttpUrl
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : ({} as Record<string, never>);

        const defaultIconFgColor = theme === "light" ? "#111827" : "#FFFFFF";
        const resolvedIconFgColor = iconFgColor || defaultIconFgColor;
        const baseCustomIconSize = pixelSize - 12;
        const customIconSize =
          network === "facebook-messenger" || network === "evernote"
            ? Math.max(10, Math.round(baseCustomIconSize * 0.9))
            : network === "hacker-news" || network === "flipboard"
              ? Math.max(10, Math.round(baseCustomIconSize * 0.85))
              : network === "text-message"
                ? Math.max(10, Math.round(baseCustomIconSize * 1.0))
                : baseCustomIconSize;

        if (network === "copy-link") {
          const copiedLabel = copied ? "Copied" : baseLabel;

          const handleCopy = async () => {
            if (typeof window === "undefined") return;
            const value = resolvedUrl;
            if (!value) return;

            try {
              if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(value);
              } else {
                const textarea = document.createElement("textarea");
                textarea.value = value;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                textarea.style.top = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
              }
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            } catch {
              // no-op: clipboard permissions can fail
            }
          };

          return (
            <button
              key={network}
              type="button"
              className={styles.item}
              onClick={handleCopy}
              aria-label={copied ? "Link copied" : label}
              title={copied ? "Link copied" : label}
              style={{
                backgroundColor:
                  buttonBgColor ||
                  (theme === "brand" ? buttonColor : theme === "dark" ? "#111827" : "#FFFFFF"),
                color: resolvedIconFgColor
              }}
            >
              <CustomNetworkIcon network={network} size={customIconSize} fgColor={resolvedIconFgColor} />
              {!iconOnly && <span className={styles.label}>{copiedLabel}</span>}
            </button>
          );
        }

        if (!canUseReactSocialIcon) {
          const resolvedButtonBgColor =
            buttonBgColor || (theme === "brand" ? buttonColor : theme === "dark" ? "#111827" : "#FFFFFF");

          return (
            <a
              key={network}
              className={styles.item}
              href={shareUrl}
              {...linkProps}
              aria-label={label}
              title={label}
              style={{
                backgroundColor: resolvedButtonBgColor
              }}
            >
              <CustomNetworkIcon network={network} size={customIconSize} fgColor={resolvedIconFgColor} />
              {!iconOnly && <span className={styles.label}>{baseLabel}</span>}
            </a>
          );
        }

        const resolvedButtonBgColor =
          buttonBgColor || (theme === "brand" ? buttonColor : theme === "dark" ? "#111827" : "#FFFFFF");

        return (
          <div key={network} className={styles.itemWrapper}>
            <SocialIcon
              url={shareUrl}
              network={reactIconKey}
              {...linkProps}
              aria-label={label}
              title={label}
              style={{ width: pixelSize, height: pixelSize }}
              bgColor={resolvedButtonBgColor}
              fgColor={resolvedIconFgColor}
            />
            {!iconOnly && <span className={styles.label}>{baseLabel}</span>}
          </div>
        );
      })}
    </div>
  );
};
