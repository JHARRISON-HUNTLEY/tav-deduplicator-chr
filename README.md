# Tab Deduplicator - Chrome Extension

Tired of opening the same domain in 50 different tabs? This extension's got your back. When you try to open a new tab with a URL that matches an existing tab's domain, it'll switch to the existing tab instead.

## Installation

1. Clone this repo
2. Open Chrome/Edge
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extension directory

## How it works

- Monitors new tab creation and updates
- Checks if the domain matches any existing tabs
- If match found: switches to existing tab instead of creating new one
- Works with any domain (youtube.com, github.com, etc.)

## Development

Want to tinker? The code's dead simple:
- `manifest.json`: Extension config
- `background.js`: All the tab-handling logic
- `icons/`: Pretty pictures

## License

MIT - Go wild! 🚀