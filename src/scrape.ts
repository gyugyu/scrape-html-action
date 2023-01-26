import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import {writeFile} from 'fs/promises'

export default async function runFetcher(
  sourceUrl: string,
  selector: string | undefined,
  destination: string | undefined
): Promise<string> {
  const res = await fetch(sourceUrl)
  const text = await res.text()
  const $ = cheerio.load(text, null)

  const html = selector ? $(selector).html() : $.html()
  if (!html) throw new Error('HTML is empty')

  if (destination) await writeFile(destination, html, 'utf8')

  return html
}