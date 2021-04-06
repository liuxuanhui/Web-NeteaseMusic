import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import XHThemeHeaderRCM from '@/components/theme-header-recommend/index';
import {HotRecommendWrapper} from './style';
import {getHotRecommendAction} from '../../store/actionCreators';
import XHSongsCover from '@/components/songs-cover'


export default memo(function XHHotRecommend() {
  const {hotRecommends} = useSelector(state => ({
    //对比./top-banner  是一模一样的效果
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }),shallowEqual)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotRecommendAction(8))  //截取8条数据(只要8条)
  },[dispatch]);

  return (
    <HotRecommendWrapper>
      <XHThemeHeaderRCM title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]}/>
      <div className="recommend-list">
        {
          hotRecommends.map((item,index) => {
          return <XHSongsCover key={item.id} info={item}/>
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
