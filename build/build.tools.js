/**
 * build前任务
 * 暂时无相关任务
 * 
 *  */

const path = require('path');

module.exports = class BuildTools {
  constructor() {
    this.pagesConfig = {};
    this.customizePath = path.join(__dirname, '../src/customize/');
    this.pagePath = '';
    this.init();
  }

  init() {
    const module = process.env.CustomArgs_module;

    // 页面配置新
    const pagePath = module && module !== '' ? `./pages/${module}` : './pages/all';
    this.pagePath = path.join(this.customizePath, pagePath);

    this.pagesConfig = require(path.join(this.pagePath, './config/page.config.js'));
    this.pagesConfig.outputDir = this.pagesConfig.outputDir || 'dist/default';
  }

  createPages() {
    const pages = this.pagesConfig.pages;
    return pages.reduce((prev, curr) => {
      const { name, entry, template = 'public/index.html', title = name, chunks = [], keyWords, description } = curr;
      prev[name] = {
        entry,
        template,
        filename: `${name}.html`,
        title,
        chunks: ['chunk-vendors', 'chunk-common', name, ...chunks]
      };

      if (keyWords) prev[name].keyWords = keyWords;
      if (description) prev[name].description = description;
      prev[name].time = +new Date();

      return prev;
    }, {});
  }
};