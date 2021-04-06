import React, {memo} from 'react'

import { User } from './style'

export default memo(function XHUserLogin() {
  return (
    <User className="user-login sprite_02">
      <p className="word">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <button className="user-button sprite_02">用户登录</button>
    </User>
  )
})