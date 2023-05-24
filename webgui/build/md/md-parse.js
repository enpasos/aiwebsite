const md = require('./md')
const { convertToRelated, flatMenu } = require('./flat-menu')
const { getVueComponent, parseFrontMatter } = require('./md-parse-utils')

module.exports = function (code, id) {
  const { data, content } = parseFrontMatter(code)

  data.id = id
  data.title = data.title || 'Generic Page'

  if (data.related !== void 0) {
    data.related = data.related.map(entry => convertToRelated(entry, id))
  }

  data.toc = []
  data.components = new Set(data.components || [])
  data.components.add('src/layouts/doc-layout/DocPage')

  const flatmenue = flatMenu
  const idKey = Object.keys(flatmenue).find((key) => {
    return key.toString().replace(/\\/g, "/") === id
  } )
  if (idKey !== void 0) {
    menu = flatmenue[idKey]

    if (menu !== void 0) {
      const { prev, next } = menu

      if (prev !== void 0 || next !== void 0) {
        data.nav = []
      }

      if (prev !== void 0) {
        data.nav.push({ ...prev, classes: 'doc-page__related--left' })
      }
      if (next !== void 0) {
        data.nav.push({ ...next, classes: 'doc-page__related--right' })
      }
    }
  }
  md.$data = data

  const mdPageContent = md.render(content)

  if (data.editLink !== false) {
    data.editLink = id.substring(id.indexOf('src/pages/') + 10, id.length - 3)
  }

  md.$data = null // free up memory

  return getVueComponent(data, mdPageContent)
}
