import React, {memo} from 'react'

import {HotAnchorWrapper} from './styled'

import { hotRadios } from '@/common/local-data'
import {getSizeImage} from '@/utils/format-utils'

export default memo(function XHHotAnchor() {
  return (
    <HotAnchorWrapper>
      <span className="hot-anchor">热门主播</span>
      <div className="list">
        {
          hotRadios.map((item,index) => {
            return (
              <div className="list-item" key={item.url}>
                <div className="left">
                  <img src={getSizeImage(item.picUrl, 40)} alt=""/>
                </div>
                <div className="right">
                  <a href="/#">{item.name}</a>
                  <span className="sprite_icon2"></span>
                  <p className="text-nowrap">{item.position}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </HotAnchorWrapper>
  )
})