const assert = require('assert')
const nock = require('nock')
const scrapper = require('../src/scrapper')

describe('scrapper', () => {

  before(() => {
    nock('http://test.com/').get('/index').reply(200, '<h1>test index</h1>')
    nock('http://test.com/').get('/page1url').reply(200, '<h1>page1 content</h1>')
    nock('http://test.com/').get('/page2url').reply(200, '<h1>page2 content</h1>')
  })

  after(() => ( nock.cleanAll() ))

  describe('scrapePage', () => {

    it('should scrape page', (done) => {
      const baseUrl = 'http://test.com/'
      const page = { url: 'index', name: 'index', contentSelector: 'h1' }
      scrapper.scrapePage(baseUrl, page, (err, pageContent) => {
        assert.ifError(err)
        assert.equal(pageContent, 'test index')
        done()
      })
    })

    it('should handle error', (done) => {
      const baseUrl = 'ugly'
      const page = { url: 'URL', contentSelector: 'h1' }
      scrapper.scrapePage(baseUrl, page, (err, pageContent) => {
        assert(err)
        assert.equal(err.code, 'ECONNREFUSED')
        assert(!pageContent)
        done()
      })
    })
  })


  describe('scrapePagesList', () => {

    it('should scrape pages list', (done) => {
      const baseUrl = 'http://test.com/'
      const pages = {
        page1: { name: 'page1name', url: 'page1url', contentSelector: 'h1' },
        page2: { name: 'page2name', url: 'page2url', contentSelector: 'h1' }
      }
      scrapper.scrapePagesList(baseUrl, pages, (err, pagesContent) => {
        assert.ifError(err)
        assert.deepEqual(pagesContent, { page1name: 'page1 content', page2name: 'page2 content' })
        done()
      })
    })

    it('should handle error', (done) => {
      const baseUrl = 'ugly'
      const pages = {
        test1: { name: 'test1', url: 'test1url' },
        test2: { name: 'test2', url: 'test2url' }
      }
      scrapper.scrapePagesList(baseUrl, pages, (err, pagesContent) => {
        assert(err)
        assert.equal(err.code, 'ECONNREFUSED')
        assert(!pagesContent)
        done()
      })
    })
  })

})
