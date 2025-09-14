# GrapesJS Vibe Coding

A tool for **vibe coding** GrapesJS projects. With this tool, the AI (tested with Claude Code) can load test websites in GrapesJS and inspect the generated HTML output programmatically.

## What it does

AI use this tool to connect to a Chrome browser via the Chrome DevTools Protocol to:

- Navigate to your GrapesJS development server (the one being edited by the AI)
- Load a website's project data from `tests/*.json`
- Extract and display the generated HTML output

## Setup instructions **for humans**

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

4. **Ask the AI** to use this tool to test what it did:

  ```txt
  Here is a tool to help you test your code: /path/to/this/repro
  Read this tool instructions in the README.md
  I placed test files in the `tests` directory as required, you can use them by running `node index.js ./tests/a-test.json` (replace the test file name in this command)
  ```

5. **The AI will test the changes it makes to your code** by running `node index.js ./tests/your-test.json`

## Usage **for AI**

Run the tool with a test data file:

```bash
node index.js ./tests/loop.json
```

Available test files: place your website data JSON in files in `/tests/`

## How it works

1. Connects to Chrome via DevTools Protocol (port 9222)
1. Navigates to your GrapesJS editor at `localhost:8080`
1. Clears localStorage to ensure clean state (your project may store website data in there)
1. Loads the specified project data from file using `editor.loadProjectData()`
1. Extracts the generated HTML from the editor canvas
1. Displays the results in the console

## Output

The tool will show:
- Loading confirmation
- Any evaluation errors
- Generated HTML output

## Troubleshooting

If you get connection errors:
- Ensure Chrome is running with `--remote-debugging-port=9222`
- Verify your GrapesJS dev server is accessible at `http://localhost:8080/`
- Check that the `editor` global variable exists in your GrapesJS setup
