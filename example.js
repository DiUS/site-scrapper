const scrapper = require('./src/scrapper')

const baseUrl = 'https://www.reddit.com/'
const sitePages = require('./site-map').pages

/* eslint-disable no-console */
scrapper.scrapePagesList(baseUrl, sitePages, (err, pages) => {
  if (err) return console.error(err)
  console.log(pages)
})
/* eslint-enable no-console */
