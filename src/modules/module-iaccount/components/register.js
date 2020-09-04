import Vue from 'vue';

// 首字母大写 a--> A
function capitalizeFirstLetter(string) {
  // return string.charAt(0).toUpperCase() + string.slice(1);
  const arr = string.split('-').map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  return arr.join('');
}

// 获取components文件夹下以.vue命名的文件
// 语法如下：(directory, useSubdirectories = false, regExp = /^\.\//)
const requireComponent = require.context('./', true, /\.vue$/);
// console.log(requireComponent.keys());

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  // 获取组件名，这里我们去掉头和尾，利用正则匹配
  // 示例： 文件 ./Skeleton/index.vue --> Skeleton
  // const tempName = fileName.match(/\/(\w+)\//i)[1];
  const tempName = fileName.split('/')[1];

  const componentName = capitalizeFirstLetter(tempName);

  // console.log(componentName);
  // Vue组件全局注册方法 --> 异步加载组件 --> 使用时才解析
  // 方法一：`require`
  Vue.component(componentName, componentConfig.default || componentConfig);
  // 方法二：`import`
  // Vue.component(componentName, () => import(`${fileName}`))
});
