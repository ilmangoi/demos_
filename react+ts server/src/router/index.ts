// 路由入口文件
import express from 'express'
import userRouter from './routes/user'

const router = express.Router()

router.use(userRouter)

export default router
