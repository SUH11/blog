const cheerio = require('cheerio') // 爬虫库 类似JQ用法
const axios = require('axios')

async function getIds() {
  let url = 'https://m.manhuatai.com/fengqicanglan/'
  let searchInfo = await axios.get(url)
  let $ = cheerio.load(searchInfo.data)
  let res = []
  $('.bd .chapter-list .item a').each((i, v) => {
    let obj = {
      id: $(v).attr('href').split('/')[2].split('.')[0],
      title: $(v).attr('title'),
    }
    res.push(obj)
  })
  return res
}

async function getRules() {
  let ids = await getIds() // 抓取页面id
  // 获取每个章节的rule
  let rules = []
  for (let i = 409; i < ids.length - 1; i += 3) {
    const curr = ids[i]
    const chapterDetail = await getCurrChapterById(curr.id)
    rules.push(...chapterDetail)
  }
  return rules
}

async function getCurrChapterById(id) {
  const url = `https://m.manhuatai.com/api/getchapterinfo?product_id=2&productname=mht&platformname=wap&comic_id=9680&chapter_newid=${id}`
  const { data: chapterRes } = await axios.get(url)
  if (!chapterRes.status) {
    const { current_chapter, prev_chapter, next_chapter } = chapterRes.data
    return [
      prev_chapter,
      current_chapter,
      next_chapter
    ]
  }
  return []
}

/**
 * 1. 先获取到页面上所有a标签下的请求id
 * 2. 根据请求id，获取到章节详细信息，包括rules
 * 3. 根据rules就可以拿到所有的图片了 // 这一步在index.html里有体现
*/
getRules().then(rules => {
  // console.log('rules', rules)

  console.log('rules', rules.map(item => item.rule.split('/')[4]).join('\n'))
  // console.log('rules', rules.map(item => item.chapter_id).join('\n'))
})
