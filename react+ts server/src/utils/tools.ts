import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { UserType } from '../typings/userType'

let dataFilePath = resolve('./data/user.json')

const strToJson = <T>(str: string): T => JSON.parse(str)
const jsonToStr = <T>(data: T): string => JSON.stringify(data)

// 读数据
export const readFile = (): UserType[] => strToJson<UserType[]>(readFileSync(dataFilePath, 'utf-8'))

// 写数据
export const writeFile = (data: UserType[]): void => {
  writeFileSync(dataFilePath, jsonToStr<UserType[]>(data))
}
