const async = require('async')
const _ = require('lodash')
const scrapeIt = require('scrape-it')
const urljoin = require('url-join')

const scrapePage = (baseUrl, page, cb) => {
  const url = urljoin(baseUrl, page.url)
  const opts = { content: page.contentSelector }
  scrapeIt(url, opts, (err, pageContent) => {
    if (err) return cb(err)
    cb(null, pageContent.content)
  })
}


const scrapePagesList = (baseUrl, pages, cb) => {
  async.map(pages, (page, cb) => {
    if (page.pages) {
      const url = urljoin(baseUrl, page.url)
      return scrapePagesList(url, page.pages, cb)
    }

    scrapePage(baseUrl, page, cb)
  }, (err, result) => {
    if (err) return cb(err)
    cb(null, _(pages).map('name').zipObject(result).value())
  })
}


module.exports = { scrapePage, scrapePagesList }
