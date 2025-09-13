const CDP = require('chrome-remote-interface')

CDP(async (client) => {
  const {Page, DOM, Runtime} = client

  await Page.enable()
  await Runtime.enable()

  await Page.navigate({url: 'https://example.com'})
  await Page.loadEventFired()

  const result = await Runtime.evaluate({
    expression: 'document.body.innerText'
  })

  console.log('Page text content:', result.result.value)

  await client.close()
}).on('error', (err) => {
  console.error('Cannot connect to Chrome:', err)
})
