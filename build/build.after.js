const logger = require('./lib/log')
const path = require('path');
const cheerio = require('cheerio')
const fs = require('fs')
const async = require('async')


class BuildAfter {
  constructor(config) {
    this.pagesConfig = config.pagesConfig;
  }

  run() {
    const pages = this.pagesConfig.pages || {};

    async.eachSeries(pages, (page, callback) => {
      const outFile = path.resolve(this.pagesConfig.outputDir, `${page.name}.html`);

      logger.yellow(`>>>>> Page Task-Start ${page.name}.html`);

      fs.readFile(outFile, "utf8", async (err, data) => {
        if (err) return callback(err);
        try {
          this.$ = cheerio.load(data, {
            decodeEntities: false
          });

          logger.yellow(`|- STRT taskSetMeta`)
          await this.taskSetMeta(page);
          logger.yellow(`|- END taskSetMeta`)
          logger.yellow(`|- STRT taskSetTheme`)
          await this.taskSetTheme();
          logger.yellow(`|- END taskSetTheme`)
          // logger.yellow(`|- STRT tastSetHref`)
          // await this.tastSetHref();
          // logger.yellow(`|- END tastSetHref`)

          fs.writeFile(outFile, this.$.html(), err => {
            if (err) {
              throw err
            }
            logger.yellow(`<<<<< Page Task-END ${page.name}.html`);
            logger.yellow();
            callback();
          })
        } catch (e) {
          return callback(e);
        }
      });
    }, err => {
      if (err) logger.red(err.message);
    });
  }


  async taskSetMeta(page) {
    const meta = page.meta || [];
    if (meta.length) {
      meta.forEach((item) => {
        this.setMetaItem(item.name, item);
      });
    }
  }

  async taskSetTheme() {
    const themes = this.pagesConfig.themes || {};
    const outCssDir = path.resolve(this.pagesConfig.outputDir, 'css');
    const themesArr = Object.keys(themes);
    if (themesArr.length) {
      const themeFiles = await this.funcGetThemes(outCssDir, themesObj);
      const themeFilesJson = JSON.stringify(themeFiles);
      if (this.$('script#configThemes').length) {
        this.$('script#configThemes').html(`var themeURL = ${themeFilesJson}`)
      } else {
        this.$('head title').after(`<script id="configThemes">var _themeURL = ${themeFilesJson}</script>`);
      }
      this.$('script#configThemes').after('<script src="./static/libs/common.js">');
      this.$('head').append('</script><script src="./static/set_themes.js"></script>');
      Object.values(themeFiles).forEach((style) => {
        this.$('script#configThemes').after(`<link href="${style}" rel="preload" as="style">`);
      });
    }
  }

  // async tastSetHref() {
  //   if (this.envConfig.exUrlPC) {
  //     this.$('head title').after(`<script>if (!/Android|webOS|iPhone|iPod|Windows Phone|BlackBerry/i.test(navigator.userAgent)) {window.location.href = ${JSON.stringify(this.envConfig.exUrlPC)}}</script>`);
  //   }
  // }

  setMetaItem(name, attrs = {}) {
    const meta = this.$(`meta[name=${name}]`);
    if (meta.attr('name')) {
      logger.yellow(`|-- update meta[name=${name}]`);
      Object.entries(attrs).forEach(([key, val]) => {
        meta.attr(key, val)
      });
    } else {
      logger.yellow(`|-- add meta[name=${name}]`);
      if (this.$('meta').length) {
        this.$('meta').last().after(`<meta name="${name}"></meta>`);
      } else {
        this.$('head').append(`<meta name="${name}"></meta>`);
      }
      this.setMetaItem(name, attrs);
    }
  }

  async funcGetThemes(fileDir, themes) {
    return new Promise((resolve, reject) => {
      fs.readdir(fileDir, (err, files) => {
        if (err) {
          logger.red('===fileDisplay===', err);
          reject();
        } else {
          const themeFiles = {};
          files.forEach((file) => {
            const filePath = path.join(fileDir, file);
            const fileStat = fs.statSync(filePath);
            const fileName = file.split('.')[0];
            if (fileStat.isFile() && themes.includes(fileName)) {
              const style = path.posix.join('./css', file);
              themeFiles[fileName] = style;
            }
            resolve(themeFiles);
          })
        }
      })
    })
  }


};

try {
  const {
    CustomArgs_module,
    CustomArgs_env
  } = process.env;
  logger.green(`===== build.${CustomArgs_module}.${CustomArgs_env}.after =====`);

  const BuildTools = require('./build.tools')
  const buildTools = new BuildTools();

  new BuildAfter(buildTools).run();
} catch (e) {
  logger.red(e.message);
};
