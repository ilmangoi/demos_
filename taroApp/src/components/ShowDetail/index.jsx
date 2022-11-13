import React from 'react'
import { View, Image } from '@tarojs/components'

const ShowDetail = ({ poster, title }) => {
  return (
    <View>
      <Image src={poster} />
      <View>{title}</View>
    </View>
  )
}

export default ShowDetail
