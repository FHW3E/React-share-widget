# react-social-widget

Make sharing effortless. Add polished, brand-colored social share buttons with a single component:
`<SocialShare />`.

This package is designed to feel “drop-in”:
smart defaults (it auto-detects your `url`, `title`, and meta `description`), instant layout options (inline or floating), and built-in fallbacks for the networks that don’t have perfect public icons everywhere.

## Quick Start

1. Install

```bash
npm install react-social-widget
npm install react react-dom
```

2. Import the CSS + use the component

```tsx
import "react-social-widget/styles.css";
import { SocialShare } from "react-social-widget";

export function ArticleShare() {
  return <SocialShare layout="inline" theme="dark" size="md" />;
}
```

That’s it. `SocialShare` will automatically use `window.location.href` and `document.title` (SSR-safe).

## Live Demo

Want to see it in action before you integrate?

Try the live demo here: [react-share-widget-demo](https://react-share-widget-demo.vercel.app/)

## Visual Examples

Bubble buttons (icon + text):

![React-Social-Widget Bubble Buttons](https://react-share-widget-demo.vercel.app/React-Share-Widget%20Bubble%20Buttons.png)

Icon-only buttons:

![React-Social-Widget Icon Only Buttons](https://react-share-widget-demo.vercel.app/React-Share-Widget%20Icon%20Only%20Buttons.png)

## Embed It Anywhere (Inline or Floating)

### Inline (inside your content)

```tsx
<SocialShare
  layout="inline"
  networks={[
    "x",
    "facebook",
    "linkedin",
    "threads",
    "bluesky",
    "copy-link"
  ]}
  size="md"
  iconOnly={true}
/>
```

### Floating (sticky share bar)

```tsx
<SocialShare layout="floating" floatingSide="left" theme="brand" size="sm" />
```

In floating mode, the buttons stay fixed on the viewport and form a vertical stack.

## Customize Everything (without extra libraries)

### Button size + icon feel
- `size`: `sm | md | lg`
- `iconOnly`: `true | false` (show/hide platform text)

### Theme (and color overrides)
- `theme`: `brand | light | dark`
- `buttonBgColor`: override all button backgrounds (optional)
- `iconFgColor`: override all icon foreground colors (optional)

Example:

```tsx
<SocialShare
  theme="brand"
  buttonBgColor="#111827"
  iconFgColor="#ffffff"
  size="lg"
/>
```

## Provide the Right Share Text

By default:
- `title` comes from `document.title`
- `text` defaults to `title`
- `description` comes from `<meta name="description">` (if present)

If you want custom messaging:

```tsx
<SocialShare
  url="https://example.com/my-post"
  title="My Post"
  text="Check this out!"
  messageText="SMS message text"
/>
```

## Facebook Messenger (requires an App ID)

The `facebook-messenger` share button uses Facebook’s share dialog, which requires an `app_id` from a Facebook App.

How to get an App ID:
1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Create an App (or select an existing one)
3. Open your App dashboard and copy the `App ID`

Use it like this:

```tsx
<SocialShare
  networks={["facebook-messenger"]}
  facebookAppId="YOUR_FACEBOOK_APP_ID"
/>
```

## Copy Link + Text Message

- `copy-link`: copies your resolved `url` using the Clipboard API.
- `text-message`: opens an SMS intent (`sms:`). Support varies by browser/device (best-effort).

## Networks Supported (MVP)

- `x`, `facebook`, `linkedin`, `reddit`, `pinterest`
- `facebook-messenger`, `hacker-news`, `flipboard`, `evernote`, `threads`, `bluesky`, `text-message`, `copy-link`
- `tumblr`, `whatsapp`, `telegram`, `email`

`react-social-icons` is used for covered networks; custom SVG icons and optimized brand colors are used for networks where icons may not match perfectly.

## Props Reference

| Prop | Type | Default | What it does |
|---|---|---|---|
| `networks` | `Network[]` | `["x","facebook","linkedin"]` | Which share buttons to render |
| `url` | `string` | `window.location.href` | The page URL used for most share intents |
| `title` | `string` | `document.title` | The page title used in many share intents |
| `text` | `string` | `title` | General text used for intents that support text |
| `messageText` | `string` | `text` | SMS text override for `text-message` |
| `facebookAppId` | `string` | `undefined` | Required for `facebook-messenger` |
| `buttonBgColor` | `string` | `undefined` | If set, overrides the background color for all buttons |
| `iconFgColor` | `string` | `undefined` | If set, overrides the icon color for all buttons |
| `description` | `string` | `meta description` or `title` | Used by a few networks (or as a fallback) |
| `subject` | `string` | `title` | Used by `email` |
| `layout` | `"inline" \| "floating"` | `"inline"` | Inline row vs floating vertical stack |
| `floatingSide` | `"left" \| "right"` | `"right"` | Side for floating layout |
| `theme` | `"brand" \| "light" \| "dark"` | `"brand"` | Controls styling contrast |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Icon/button size |
| `className` | `string` | `undefined` | Add custom class to the wrapper |
| `iconOnly` | `boolean` | `true` | Show only icons (hide/show text labels) |

## Network Buttons (with optional props)

All networks support the “global” props: `layout`, `floatingSide`, `theme`, `size`, `iconOnly`, `buttonBgColor`, `iconFgColor`, `url`, `title`, `text`, `description`, and `subject` (where applicable).

### X (`"x"`)

Use this for posts/articles you want to share on X. Optionally override `url`, `title`, and/or `text`.

```tsx
<SocialShare networks={["x"]} url="https://example.com/post" title="My Post" text="Worth a read" />
```

### Facebook (`"facebook"`)

Uses the Facebook share intent with your `url`. Optionally override `url` and `title`.

```tsx
<SocialShare networks={["facebook"]} url="https://example.com/post" />
```

### LinkedIn (`"linkedin"`)

Shares your `url` via LinkedIn. Optionally override `url` and `title`.

```tsx
<SocialShare networks={["linkedin"]} title="My Article" url="https://example.com/article" />
```

### Reddit (`"reddit"`)

Pre-fills the Reddit submission with your `url` and `title`. Optionally override both (and optionally `text`).

```tsx
<SocialShare networks={["reddit"]} title="A take on modern web" url="https://example.com/rant" />
```

### Pinterest (`"pinterest"`)

Pre-fills a Pinterest pin using your `url` and `description` (fallback: `text`). Optionally override `description`.

```tsx
<SocialShare networks={["pinterest"]} description="Aesthetic design + implementation" url="https://example.com/design" />
```

### Email (`"email"`)

Uses a `mailto:` link. Optionally override `subject` and the body (`text`).

```tsx
<SocialShare networks={["email"]} subject="Check this out" text="Here’s the link:" url="https://example.com" />
```

### WhatsApp (`"whatsapp"`)

Creates a WhatsApp share link using your `text` and `url`. Optionally override `text`.

```tsx
<SocialShare networks={["whatsapp"]} text="Sent you this" url="https://example.com" />
```

### Telegram (`"telegram"`)

Uses Telegram’s share intent with `text` and `url`. Optionally override `text`.

```tsx
<SocialShare networks={["telegram"]} text="Thought you might like this" url="https://example.com" />
```

### Facebook Messenger (`"facebook-messenger"`)

This one is special: Messenger requires a valid Facebook `app_id`. Provide it via `facebookAppId`, and optionally override `url`.

```tsx
<SocialShare networks={["facebook-messenger"]} facebookAppId="YOUR_FACEBOOK_APP_ID" url="https://example.com" />
```

### Hacker News (`"hacker-news"`)

Opens the Hacker News submission form with your `url` and `title`. Optionally override both.

```tsx
<SocialShare networks={["hacker-news"]} title="Show HN: This is neat" url="https://example.com" />
```

### Flipboard (`"flipboard"`)

Pre-fills Flipboard with your `title` and `url`. Optionally override both.

```tsx
<SocialShare networks={["flipboard"]} title="My Flipboard pick" url="https://example.com" />
```

### Evernote (`"evernote"`)

Clips to Evernote using your `title` and `url`. Optionally override both.

```tsx
<SocialShare networks={["evernote"]} title="Save for later" url="https://example.com" />
```

### Threads (`"threads"`)

Opens the Threads composer using your `text` and `url`. Optionally override `text`.

```tsx
<SocialShare networks={["threads"]} text="Discussion time!" url="https://example.com" />
```

### Bluesky (`"bluesky"`)

Opens the Bluesky composer using your `text` and `url`. Optionally override `text`.

```tsx
<SocialShare networks={["bluesky"]} text="Sharing this ✨" url="https://example.com" />
```

### Tumblr (`"tumblr"`)

Pre-fills Tumblr with `title`, `url`, and `description`. Optionally override `description`.

```tsx
<SocialShare networks={["tumblr"]} title="A post on Tumblr" description="Short caption here" url="https://example.com" />
```

### Text message / SMS (`"text-message"`)

Opens an `sms:` intent. By default it uses `text` (fallback: `title`), but you can override via `messageText`.

```tsx
<SocialShare networks={["text-message"]} messageText="Check this out:" url="https://example.com" />
```

### Copy link (`"copy-link"`)

Copies the resolved `url` to the clipboard (no extra intent needed). You can still customize `theme`, `size`, and colors.

```tsx
<SocialShare networks={["copy-link"]} url="https://example.com" />
```

## Notes

- React compatibility: requires `react` and `react-dom` v16.8+ (hooks).
- `react` and `react-dom` are peer dependencies—install them in your app.
- Some share actions are best-effort (for example, SMS and clipboard availability depends on browser permissions).
- SSR-safe: this component avoids reading `window`/`document` during server rendering.
- Built with:
  - [`react-social-icons`](https://github.com/couetilc/react-social-icons)
  - [`simple-icons`](https://github.com/simple-icons/simple-icons)

## License

MIT. See [LICENSE](https://opensource.org/license/mit).
