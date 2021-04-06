import React, {memo, useEffect,useRef } from 'react';
import { useDispatch, useSelector, shallowEqual} from 'react-redux';

import { getNewAlbumAction } from '../../store/actionCreators';

import XHThemeHeaderRCM from '@/components/theme-header-recommend';
import { AlbumWrapper } from './style';
import { Carousel } from 'antd';
import XHAlbumCover from '@/components/album-cover';

export default memo(function XHNewAlbum() {
/*
  步骤4.
  store通过Provider 将state共享出去
  此处获取需要进行展示的数据
*/
  const {newAlbums} = useSelector(state => ({
    newAlbums: state.get("recommend").get("newAlbums")
  }),shallowEqual);

  const dispatch = useDispatch();
  const pageRef = useRef();
  /*
    步骤1.传给dispatch一个函数，内部会执行此函数 
    作用：可以传参
  */
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  },[dispatch]);

  return (
    <AlbumWrapper>
      <XHThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button className="arrow arrow-left sprite_02" 
                onClick={e => pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            { 
              //展示两组数据  一组5个
              [0, 1].map(item => {
                return (
                  <div key={item} className="page">
                    {
                      //splice(0,5)  是包含0不包含5
                      newAlbums.slice(item * 5, (item + 1) * 5).map(iten => {
                        return <XHAlbumCover key={iten.id}  
                                             info={iten} 
                                             size={100} 
                                             width={118} 
                                             bgp="-570px"/>
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02"
                onClick={e => pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})