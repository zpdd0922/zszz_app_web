/**
 * build前任务
 * 暂时无相关任务
 * 
 *  */

const logger = require('./lib/log')

const {CustomArgs_module, CustomArgs_env} = process.env;
logger.green(`===== build.${CustomArgs_module}.${CustomArgs_env}.before =====`);