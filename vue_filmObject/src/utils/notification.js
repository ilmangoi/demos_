import { Notification } from 'element-ui'
import { MessageBox } from 'element-ui'

// !这样二次封装后的组件有一个好处，那就是如果有一天这个项目要用另一个ui库
// !业务代码中就不需要全部更改了，只需要改干净封闭的库就可以了，但是要保证这里的方法名不变
class Notify {
  static delay = 1500

  static success(title, message) {
    Notification.success({
      duration: Notify.delay,
      title: title,
      message: message
    })
  }

  static error(title, message) {
    Notification.error({
      duration: Notify.delay,
      title: title,
      message: message
    })
  }

  static warn(title, message) {
    Notification.warning({
      duration: Notify.delay,
      title: title,
      message: message
    })
  }

  static info(title, message) {
    Notification.info({
      duration: Notify.delay,
      title: title,
      message: message
    })
  }

  static confirm(
    title,
    message,
    callback = (action, instance, done) => {
      done() // 不执行done()，则不会关闭弹窗
    }
  ) {
    return MessageBox.confirm(message, title, {
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      beforeClose: callback
    })
  }
}

export default Notify
