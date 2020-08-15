# WLS:app_web

> a1011-01-wls项目前端模块

### 目录说明

```
build                     // 打包相关
dist                      // 打包输出目录
node_modules              // 依赖包
public                    // 公共文件
src                       // 业务代码
 cunstomize               // 客户定制化模块
  app-static              // 项目定制静态文件
  assets                  // 项目定制相关资源
  components              // 项目定制相关组件
  define                  // 项目定制全局定义
  locale                  // 项目定制国际化
  pages                   // 项目定制打包配置（这里指定启动文件）
  theme                   // 项目定制皮肤等

 main                     // 公共模块
 modules                  // 业务模块
  module-iaccount         // iaccount模块
  module-iopen            // iopen模块
  module-sign             // 登录模块（minigod后台）
  module-sign-icrm        // 登录模块（icrm单独中台）
```

### 项目启动

**安装依赖**

  `yarn install`  
  or <br />
  `npm run eslint `

 *安装失败处理*

#### 全局安装node-gyp（命令行管理员模式）
  
  `npm install --global node-gyp`  

#### 全局安装windows-build-tools（命令行管理员模式）
  
  `npm install --global windows-build-tools `  

**启动**

  `yarn <type> -m [model] --env [env] `
  
  or

 `npm run <type> -- -m [model] --env [env] `

 > <span style="color: red">npm run 命令带参数 必须 **--**， 参考 nodeJs  `npm run [command] [-- <args>]`</span>

 *参数说明* 

*`<type>` 启动模式 ( `serve` 开发模式 / `build` 生产模式 )* <br />
 
*`[model]` 打包模块 `[model]` __Default `all`*<br />
 
*`[env]` 环境 `env.config.js`  __Default: `sbox`*<br />
 

*Example：* 

*`yarn serve -m iopen --env dev`* <br />

*`npm run build -- -m iopen --env dev`*


#### Eslint检查

检查 <br />
`yarn lint `  or  `npm run lint`

带自动纠正：<br />
`yarn eslint `  or  `npm run eslint`

