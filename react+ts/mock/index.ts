import type { Request, Response, Application } from 'express'

export default (app: Application) => {
  app.get('/api/users', (req: Request, res: Response) => {
    res.send({
      code: 0,
      msg: 'ok',
      data: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ]
    })
  })
}
