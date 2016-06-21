const async = require('async')
const scrapeIt = require('scrape-it')
const urljoin = require('url-join')

const scrapePage = (baseUrl, page, cb) => {
  const url = urljoin(baseUrl, page.url)
  const opts = { content: page.contentSelector }
  scrapeIt(url, opts, (err, pageContent) => {
    if (err) return cb(err)
    cb(null, { [page.name]: pageContent.content })
  })
}


const scrapePagesList = (baseUrl, pages, cb) => {
  async.map(pages, (page, cb) => {
    if (page.pages) {
      const url = urljoin(baseUrl, page.url)
      return scrapePagesList(url, page.pages, cb)
    }

    scrapePage(baseUrl, page, cb)
  }, cb)
}

module.exports = { scrapePage, scrapePagesList }
