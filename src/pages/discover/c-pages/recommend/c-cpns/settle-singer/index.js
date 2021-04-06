import React, {memo, useEffect} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { Singer } from './style'

import {getSettleSingers} from '../../store/actionCreators'
import {getSizeImage} from "@/utils/format-utils";

export default memo(function XHSettleSinger() {

  const { settleSings } = useSelector( state => ({
    settleSings: state.get("recommend").get("settleSings")
  }),shallowEqual);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSettleSingers())
  },[dispatch])

  return (
    <Singer>
      <div className="singer-header">
        <span>入住歌手</span>
        <a href="/#">查看全部 &gt;</a>
      </div>
      <div className="singer-content">
        {
          settleSings.map((item,index) => {
            return (
              <a href="/#" key={item.id} className="content-wrap">
                <img src={getSizeImage(item.img1v1Url, 62)} alt=""/>
                <div className="info">
                  <div className="artist-name text-nowrap">{item.alias.join("") || item.name}</div> 
                    {/* 有的item.alias没有值 */}
                  <div className="artist text-nowrap">音乐人</div>
                </div>
              </a>
            )
          })
        }
      </div>
    </Singer>
  )
})