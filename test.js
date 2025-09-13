const CDP = require('chrome-remote-interface')
const projectData = require('./test-data.json')

CDP(async (client) => {
  const {Page, DOM, Runtime} = client

  await Page.enable()
  await Runtime.enable()
  await DOM.enable()

  console.log('Navigating to http://localhost:8080/')
  await Page.navigate({url: 'http://localhost:8080/'})
  await Page.loadEventFired()

  await new Promise(resolve => setTimeout(resolve, 2000))
  // Load project data and check the results
  console.log('Evaluation of the result')
  await Runtime.evaluate({
    expression: `
      (async () => {
        try {
          console.log('===>');
          await editor.loadProjectData(${JSON.stringify(projectData)});
          editor.runCommand('data-source:refresh')
          console.log('RESULT:', editor.getWrapper().view.el.innerHTML);
          localStorage.clear()
        } catch (e) {
          console.error('EVAL ERROR:', e);
        }
      })();
    `
  })

  await new Promise(resolve => setTimeout(resolve, 2000))

  // First check if we can find the GrapesJS iframe
  const iframeCheck = await Runtime.evaluate({
    expression: `editor?.getWrapper().view?.el.innerHTML`
  })

  console.log('\n=== IFRAME CHECK ===')
  console.log(iframeCheck.result.value || 'empty')
  process.exit(0)
}).on('error', (err) => {
  console.error('Cannot connect to Chrome:', err)
  console.log('\nMake sure:')
  console.log('1. Chrome is running with --remote-debugging-port=9222')
  console.log('2. Your development server is running on http://localhost:8080/')
  console.log('\nTo start Chrome with remote debugging:')
  console.log('google-chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check')
})
