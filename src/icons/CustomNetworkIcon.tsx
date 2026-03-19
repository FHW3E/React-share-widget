import type { Network } from "../types";

import { siEvernote, siFlipboard, siImessage, siMessenger, siYcombinator } from "simple-icons";

interface CustomNetworkIconProps {
  network: Network;
  size: number;
  fgColor: string;
}

const iconStyle = (size: number) => ({
  width: size,
  height: size,
  display: "block",
  flexShrink: 0
});

const SIMPLE_ICON_BY_NETWORK: Partial<Record<Network, { path: string }>> = {
  "facebook-messenger": { path: siMessenger.path },
  flipboard: { path: siFlipboard.path },
  evernote: { path: siEvernote.path },
  "hacker-news": { path: siYcombinator.path },
  "text-message": { path: siImessage.path }
};

export const CustomNetworkIcon = ({ network, size, fgColor }: CustomNetworkIconProps) => {
  if (network === "copy-link") {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-hidden style={iconStyle(size)}>
        <path
          fill={fgColor}
          fillRule="evenodd"
          d="M9 7.5a2.5 2.5 0 0 1 2.5-2.5H18a2.5 2.5 0 0 1 2.5 2.5V14A2.5 2.5 0 0 1 18 16.5h-6.5A2.5 2.5 0 0 1 9 14V7.5Zm2.5-.5a.5.5 0 0 0-.5.5V14c0 .276.224.5.5.5H18a.5.5 0 0 0 .5-.5V7.5a.5.5 0 0 0-.5-.5h-6.5Z"
          clipRule="evenodd"
        />
        <path
          fill={fgColor}
          d="M6 8a1 1 0 0 0-1 1v8a2.5 2.5 0 0 0 2.5 2.5H15a1 1 0 1 0 0-2H7.5a.5.5 0 0 1-.5-.5V9a1 1 0 0 0-1-1Z"
        />
      </svg>
    );
  }

  const simpleIcon = SIMPLE_ICON_BY_NETWORK[network];
  if (!simpleIcon) return null;

  let cleanedPath = simpleIcon.path;

  // iMessage icon includes a rounded-square glyph container as the first sub-path.
  // For our button, we only want the message glyph to avoid a visible white square.
  if (network === "text-message") {
    const marker = "ZM12";
    const markerIndex = cleanedPath.indexOf(marker);
    if (markerIndex >= 0) {
      cleanedPath = cleanedPath.slice(markerIndex + 1); // drop the leading `Z` so it starts at `M...`
    }
  }

  // Flipboard and Hacker News paths include a solid outer square as the first sub-path.
  // Strip it so they don't overlap the circular button background.
  if (network === "flipboard" || network === "hacker-news") {
    cleanedPath = cleanedPath
      .replace(/^M0\s+0v24h24V0H0z/i, "")
      .replace(/^M0\s+24V0h24v24H0z/i, "")
      .trim();

    // Normalize leading relative move commands (`m`) to absolute (`M`) after stripping.
    // Otherwise, the remaining glyph can be positioned slightly off-center.
    if (/^m/i.test(cleanedPath)) {
      cleanedPath = `M${cleanedPath.slice(1)}`;
    }
  }

  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden style={iconStyle(size)}>
      <path fill={fgColor} d={cleanedPath} />
    </svg>
  );
};
