// 声明文件，可以在此文件中给已有类型添加属性，它可以给js文件添加类型支持
// 在 .d.ts 文件中声明一个类型一定要用declare，如果你有此文件，则一定要在 tsconfig.json文件中开启 baseUrl配置
// baseUrl要为 ./ ，在include中配置的路径都是以baseUrl为基准的，比如app.d.ts文件的路径为 ./app.d.ts
// 修改一下 tsconfig中"include"的配置: ["src", "app.d.ts"]

// 由于这个文件中没有导入任何模块，所以这个文件中的类型是全局的(脚本模式)
// 如果在模块中想要进行外参类型声明，可以使用declare global

declare global {
  interface Window {
    // 为window添加属性
    test: string;
  }
}
// 利用namespace会合并的特性，给Express添加属性
declare namespace Express {
  // 由于我们这里是想给Express.Request添加属性，所以这里要用interface进行合并，而不是导出一个新的类型
  interface Response {
    api: (code: number, data: any) => void;
  }
}
