# GrapesJS Vibe Coding Setup

A Chrome DevTools Protocol automation tool for **vibe coding** GrapesJS projects. With this tool, the AI (tested with Claude Code) can load test websites in GrapesJS and inspect the generated HTML output programmatically.

## What it does

AI use this tool to connect to a Chrome browser via the Chrome DevTools Protocol to:

- Navigate to your GrapesJS development server (the one being edited by the AI)
- Load a website's project data from `tests/*.json`
- Extract and display the generated HTML output

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Chrome with remote debugging**
   ```bash
   npm start
   ```
   This will launch Chrome with debugging enabled and show you the next command to run. You need chromium-browser installed.

3. **Make sure your GrapesJS development server is running**
   Your GrapesJS editor should be accessible at `http://localhost:8080/`

## Usage

Run the tool with a test data file:

```bash
node index.js ./tests/loop.json
```

Available test files:
- `./tests/loop.json` - Basic loop data test
- `./tests/loop-in-loop.json` - Nested loop test
- `./tests/visibility.json` - Visibility condition test

## How it works

1. Connects to Chrome via DevTools Protocol (port 9222)
2. Navigates to your GrapesJS editor at `localhost:8080`
3. Clears localStorage to ensure clean state
4. Loads the specified project data using `editor.loadProjectData()`
5. Refreshes data sources with `editor.runCommand('data-source:refresh')`
6. Extracts the generated HTML from the editor canvas
7. Displays the results in the console

## Output

The tool will show:
- Loading confirmation
- Any evaluation errors
- Final iframe content check
- Generated HTML output

Perfect for debugging GrapesJS data binding, loops, and conditional rendering issues!

## Troubleshooting

If you get connection errors:
- Ensure Chrome is running with `--remote-debugging-port=9222`
- Verify your GrapesJS dev server is accessible at `http://localhost:8080/`
- Check that the `editor` global variable exists in your GrapesJS setup
