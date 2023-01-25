import * as core from '@actions/core'
import scrape from './scrape'

async function run(): Promise<void> {
  try {
    const sourceUrl = core.getInput('url')
    const selector = core.getInput('selector')
    const destination = core.getInput('destination')

    core.debug(`Fetching ${sourceUrl}  ...`)
    const html = await scrape(sourceUrl, selector, destination)
    core.setOutput('html', html)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
