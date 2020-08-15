const spawn = require('child_process').spawnSync;
const path = require('path');
const isWin = process.platform === 'win32';

module.exports = class Helper {
  constructor() {
    const yargs = require('yargs').argv;

    const pwdPath = yargs.path || '.';
    const pwd = process.cwd();
    const destPath = path.join(pwd, pwdPath);
    const model = yargs.m || undefined;
    const env = yargs.env || undefined;

    this.options = {
      stdio: 'inherit',
      cwd: destPath,
      env: Object.assign({
        CustomArgs_module: model,
        CustomArgs_env: env
      }, process.env),
      shell: isWin
    };

  }

  checkError(data) {
    if (!data || data.status !== 0) {
      throw error('构建失败');
    }
  }

  serve() {
    spawn("npm", ["run serve"], this.options);
  }

  build() {
    const before = spawn("node", ["build/build.before.js"], this.options);
    this.checkError(before);
    const dist = spawn("npm", ["run build"], this.options);
    this.checkError(dist);
    const after = spawn("node", ["build/build.after.js"], this.options);
    this.checkError(after);
  }
};