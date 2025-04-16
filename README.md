# Link Summarizer Chrome Extension

A Chrome extension that uses OpenAI to summarize web pages and links.

## Features

- Save and Summarize any webpage or link
- Categorize your saved pages
- Find your links with fuzzy search

## Setup

1. Clone the repository:

```bash
git clone https://github.com/psantacreu/extension-save-urls.git
cd extension-save-urls
```

2. Install dependencies:

```bash
npm install
```

3. Build the app

```bash
npm run build
```

## Loading the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select the `dist` folder

## Security

- API keys are stored securely in Chrome's storage
- Consider using a backend proxy for additional security

## License

MIT License - see [LICENSE](LICENSE) for details.
