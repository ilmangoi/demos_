import Watcher from './Watcher.js'

export default class Compile {
  // el它只是一个选择器名称，不是一个dom对象，进行转换为dom对象
  constructor(el, data) {
    const rootDom = document.querySelector(el)
    this.compilerTemplate(rootDom, data)
  }

  compilerTemplate(rootDom, data) {
    // 对于根容器下面所有的子孙节点进行迭代
    rootDom.childNodes.forEach(node => {
      // 判断它是否是元素，如果是元素，则继续进行
      if (node.nodeType === 1) {
        this.compileHtml(node, data)
        // 元素下面是否有子元素，如果有，则继续
        if (node.childNodes.length > 0) this.compilerTemplate(node, data)
      } else if (node.nodeType === 3 && /\{\{\s*(\w+)\s*\}\}/.test(node.textContent)) {
        // console.log('文本', node.textContent, RegExp.$1)
        // 渲染文本节点
        this.compileText(node, RegExp.$1, data)
      }
    })
  }

  // 对于{{变量}} 进行渲染
  compileText(node, key, data) {
    // new Watcher(key, data, val => console.log('compileText', val))
    new Watcher(key, data, val => {
      node.textContent = val
    })
    node.textContent = data[key]
  }

  // 对于元素进行渲染处理
  compileHtml(node, data) {
    // 获取元素的属性
    // console.log(Array.from(node.attributes))
    // console.log([...node.attributes])
    ;[...node.attributes].forEach(({ name, value: key }) => {
      // if (name === 'v-html') {
      //   node.innerHTML = data[key]
      // } else {
      //   node.innerText = data[key]
      // }
      // 策略 封装一下
      try {
        if (name.startsWith('v-')) {
          this[name.slice(2)](node, data, key)
        }
      } catch (error) {
        console.log('调用的方法不存在', error)
      }
    })
  }

  html(node, data, key) {
    new Watcher(key, data, val => {
      node.innerHTML = val
    })
    node.innerHTML = data[key]
  }

  text(node, data, key) {
    new Watcher(key, data, val => {
      node.textContent = val
    })
    node.innerText = data[key]
  }

  model(node, data, key) {
    node.value = data[key]
    node.addEventListener('input', function () {
      node.value = this.value
      data[key] = this.value
    })
  }
}
