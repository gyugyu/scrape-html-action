import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import {mkdirp} from 'mkdirp'
import path from 'path'
import {writeFile} from 'fs/promises'

export default async function runFetcher(
  sourceUrl: string,
  selector: string | undefined,
  destination: string | undefined
): Promise<{html: string; title: string}> {
  const res = await fetch(sourceUrl)
  const text = await res.text()
  const $ = cheerio.load(text, null)

  const title = $('title').text()

  const html = selector ? $(selector).html() : $.html()
  if (!html) throw new Error('HTML is empty')

  if (destination) {
    await mkdirp(path.dirname(destination))
    await writeFile(destination, html, 'utf8')
  }

  return {html, title}
}
