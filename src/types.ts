export type Network =
  | "x"
  | "facebook"
  | "linkedin"
  | "reddit"
  | "pinterest"
  | "email"
  | "whatsapp"
  | "telegram"
  | "text-message"
  | "facebook-messenger"
  | "hacker-news"
  | "copy-link"
  | "flipboard"
  | "evernote"
  | "threads"
  | "bluesky"
  | "tumblr";

export type ShareTheme = "brand" | "light" | "dark";
export type ShareLayout = "inline" | "floating";
export type ShareSize = "sm" | "md" | "lg";
export type FloatingSide = "left" | "right";

export interface SocialShareProps {
  networks?: Network[];
  url?: string;
  title?: string;
  text?: string;
  description?: string;
  subject?: string;
  /**
   * Facebook Messenger requires a valid Facebook App ID for the share dialog.
   * Pass your App ID to enable the `facebook-messenger` intent reliably.
   */
  facebookAppId?: string;
  /**
   * Extra override text used for SMS/text-message intent.
   * If not set, it falls back to `text` (or `title`).
   */
  messageText?: string;
  /**
   * Optional override for all button background colors.
   * When unset, each network uses the library's standard colors.
   */
  buttonBgColor?: string;
  /**
   * Optional override for all icon foreground colors.
   * When unset, icons use the standard colors based on `theme`.
   */
  iconFgColor?: string;
  layout?: ShareLayout;
  floatingSide?: FloatingSide;
  theme?: ShareTheme;
  size?: ShareSize;
  className?: string;
  iconOnly?: boolean;
}
