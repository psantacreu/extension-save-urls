# Link Summarizer Chrome Extension

A Chrome extension that uses OpenAI to summarize web pages and links.

## Features

- Summarize any webpage or link
- Save and manage your summaries
- Customizable summary length
- Dark/Light mode support

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

3. Create your environment file:

```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`

## Development

```bash
npm run dev
```

## Building

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
- Implement rate limiting for API calls

## License

MIT License - see [LICENSE](LICENSE) for details.
