import { useState } from "react";
import { SocialShare } from "../../src";
import type { Network, ShareLayout, ShareSize, ShareTheme } from "../../src";

const ALL_NETWORKS: Network[] = [
  "x",
  "facebook",
  "linkedin",
  "reddit",
  "pinterest",
  "text-message",
  "facebook-messenger",
  "hacker-news",
  "flipboard",
  "evernote",
  "threads",
  "bluesky",
  "tumblr",
  "whatsapp",
  "telegram",
  "email",
  "copy-link"
];

export const App = () => {
  const [url, setUrl] = useState("https://example.com/article");
  const [title, setTitle] = useState("Example Article Title");
  const [text, setText] = useState("Check out this article");
  const [description, setDescription] = useState("A short description used by some share intents.");
  const [subject, setSubject] = useState("Great read");
  const [facebookAppId, setFacebookAppId] = useState("");

  const [useCustomButtonBg, setUseCustomButtonBg] = useState(false);
  const [customButtonBgColor, setCustomButtonBgColor] = useState("#111827");
  const [useCustomIconFg, setUseCustomIconFg] = useState(false);
  const [customIconFgColor, setCustomIconFgColor] = useState("#ffffff");

  const [layout, setLayout] = useState<ShareLayout>("inline");
  const [floatingSide, setFloatingSide] = useState<"left" | "right">("right");
  const [theme, setTheme] = useState<ShareTheme>("brand");
  const [size, setSize] = useState<ShareSize>("md");
  const [iconOnly, setIconOnly] = useState(true);

  const shareProps = {
    networks: ALL_NETWORKS,
    url,
    title,
    text,
    description,
    subject,
    facebookAppId,
    buttonBgColor: useCustomButtonBg ? customButtonBgColor : undefined,
    iconFgColor: useCustomIconFg ? customIconFgColor : undefined,
    layout,
    floatingSide,
    theme,
    size,
    iconOnly
  };

  return (
    <div className="page">
      <h1>SocialShare demo</h1>
      <p className="hint">Edit inputs to test share URL formats and icon fallbacks.</p>

      <div className="grid">
        <div className="panel">
          <label>
            URL
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          </label>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Text
            <input value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <label>
            Description
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Email subject
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label>
            Facebook App ID (Messenger)
            <input value={facebookAppId} onChange={(e) => setFacebookAppId(e.target.value)} />
          </label>
        </div>

        <div className="panel">
          <label>
            Layout
            <select value={layout} onChange={(e) => setLayout(e.target.value as ShareLayout)}>
              <option value="inline">inline</option>
              <option value="floating">floating</option>
            </select>
          </label>
          <label>
            Floating side
            <select
              value={floatingSide}
              onChange={(e) => setFloatingSide(e.target.value as "left" | "right")}
              disabled={layout !== "floating"}
            >
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </label>
          <label>
            Theme
            <select value={theme} onChange={(e) => setTheme(e.target.value as ShareTheme)}>
              <option value="brand">brand</option>
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </label>

          <label className="row">
            <input
              type="checkbox"
              checked={useCustomButtonBg}
              onChange={(e) => setUseCustomButtonBg(e.target.checked)}
            />
            Custom button background
          </label>
          <label>
            Button bg color
            <input
              type="color"
              value={customButtonBgColor}
              onChange={(e) => setCustomButtonBgColor(e.target.value)}
              disabled={!useCustomButtonBg}
            />
          </label>

          <label className="row">
            <input
              type="checkbox"
              checked={useCustomIconFg}
              onChange={(e) => setUseCustomIconFg(e.target.checked)}
            />
            Custom icon color
          </label>
          <label>
            Icon fg color
            <input
              type="color"
              value={customIconFgColor}
              onChange={(e) => setCustomIconFgColor(e.target.value)}
              disabled={!useCustomIconFg}
            />
          </label>

          <label>
            Size
            <select value={size} onChange={(e) => setSize(e.target.value as ShareSize)}>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>

          <label className="row">
            <input type="checkbox" checked={iconOnly} onChange={(e) => setIconOnly(e.target.checked)} />
            Icon only
          </label>
        </div>
      </div>

      <div className="shareRow">
        <SocialShare {...shareProps} />
      </div>

      <div className="note">
        Tip: In floating mode, the bar is fixed to the viewport and uses `floatingSide`.
      </div>
    </div>
  );
};

