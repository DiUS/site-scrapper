## site-scrapper
Site scrapping utility for Node.js  

### Use
```javascript
const scrapper = require('site-scrapper')

const baseUrl = 'https://www.example.com/'
const sitePages = require('./site-map').pages

scrapper.scrapePagesList(baseUrl, sitePages, (err, pages) => {
  if (err) return console.error(err)
  console.log(pages)
})
```

Site map example
```json
{
  "pages": {
    "home": {
      "name": "home",
      "contentSelector": ".home-content"
    },
    "contactUs": {
      "name": "contactUs",
      "url": "contact-us",
      "contentSelector": ".contact-us-content"
    },
    "blog": {
      "name": "blog",
      "url": "blog",
      "pages": {
        "latest": {
          "name": "latest",
          "url": "latest",
          "contentSelector": ".blog-posts"
        },
        "history": {
          "name": "history",
          "url": "history",
          "contentSelector": ".blog-posts"
        }
      }
    }
  }
}
```

#### scrapePagesList()
##### Options
* `baseUrl` \<String\> Target site to scrap
* `sitePages` \<Object\> List of pages to scrap in format `{ pageName: pageOptions, ... }`
  * `pageOptions` \<Object\>
    * `name` \<String\> Page name used for mapping of scrapped content
    * `url` \<String\> Page url, will be automatically prefixed with `baseUrl`
    * `contentSelector` \<String\>
    * `pages` \<sitePages\> List of nested pages to scrap, for all nested pages `baseUrl` will be `baseUrl/url`
* `callback` \<Function\> A callback function

##### Output
Function returns result in the following format
```json
{
  "pageName1": "pageContent",
  "pageName2": {
    "subPageName1": "subPage1Content"
  }
}
```

#### scrapePage()
##### Options
* `baseUrl` \<String\> Target site to scrap
* `pageOptions` \<Object\>
  * `name` \<String\> Page name used for mapping of scrapped content
  * `url` \<String\> Page url, will be automatically prefixed with `baseUrl`
  * `contentSelector` \<String\>
* `callback` \<Function\> A callback function

##### Output
Function returns page content as `String`
