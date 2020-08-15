
export default class Logger {
  level = 0;

  _options = {
    debug: {
      level: 0,
      name: 'DEBUG',
      color: '#666'
    },
    info: {
      level: 1,
      name: 'INFO',
      color: '#2196F3'
    },
    success: {
      level: 2,
      name: 'SUCCESS',
      color: '#4caf50'
    },
    error: {
      level: 3,
      name: 'ERROR',
      color: '#ff5722'
    }
  };

  static log(type, content) {
    const { level, name, color } = this._options[type] || {};
    if (level && level >= this.level) {
      const str = typeof content === 'object' ? JSON.stringify(content) : content;
      console.groupCollapsed(`[${name}]`, `color:${color}`);
      console.info(`[Content] %c${str}`, `font-style:italic;color:${color}`);
      console.groupEnd();
    }
  }

  debug(content) {
    Logger.log('debug', content);
  }
  info(content) {
    Logger.log('info', content);
  }
  success(content) {
    Logger.log('success', content);
  }
  error(content) {
    console.error(content);
  }
}
