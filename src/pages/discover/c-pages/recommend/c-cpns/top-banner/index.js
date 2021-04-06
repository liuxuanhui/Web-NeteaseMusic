import React, {memo, useEffect, useRef, useCallback,useState} from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux'

import {getTopBannerAction} from '../../store/actionCreators';

import {
  BannerWrapper, 
  BannerLeft,
  BannerRight,
  BannerControl
} from './style';
import { Carousel } from 'antd';

export default memo(function XHTopBanner() {
//1.组件内部state管理 
  const [currentIndex,setCurrentIndex] = useState(0);

//2.redux的hooks代码  
  //第一个参数：要求传入一个回调函数并且有一个参数state   
  //第二个参数：shallowEqual为了性能优化 useSelector不像connect那样是浅层比较 而是===
    //因为函数每次调用才创建地址是不一样的 所以导致不依赖的数据发生改变时 这里也会重新渲染
    //shallowEqual就是让useSelector变成浅层比较 依赖的数据发生变化才会重新渲染
    const recommend = useSelector(state => ({
      topBanners: state.get("recommend").get("topBanners")
      //immutable不能通过"."拿数据了
      //get("recommend")是因为recommend在合并reducer那里变成immutable对象了
      //get("topBanners")是因为在recommend/store/reducer那里变成immutable对象了
    }),shallowEqual);
    //拿到的是dispatch对象
    const whatever = useDispatch();
  
//3.其他组件hooks代码
    const bannerRef = useRef()
    useEffect(() => {
      whatever(getTopBannerAction())  //dispatch的是getTopBannerAction()的返回值
    },[whatever]);

    const bannerChange = useCallback((from,to) => {
      //当一个函数作为参数的时候传组件里面 一定要用到useCallback提高性能 之前讲过
      //from  to  都是数字类型  表示从第几张图片来到第几张图片
      setTimeout(() => {
        setCurrentIndex(to)
      },0); //见最后一集的bug
    },[]);

//其他逻辑代码    
    //最开始的时候recommend.topBanners这个数组是空的 取imageUrl会报错
    const bg = recommend.topBanners[currentIndex] && (recommend.topBanners[currentIndex].imageUrl 
    + "?imageView&blur=40x20")
    //后边添加的参数是网易云的根据图片制作的高斯模糊图   
  
//返回JSX代码    
  return (
    <BannerWrapper bgImage={bg}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
          {/* autoplay、beforeChange是antd走马灯组件给的api */}
            {
              recommend.topBanners.map((item, index) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
          {/* prev与next是antd走马灯组件给的方法  */}
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

// function XHRecommend(props) {
//   const { getBanners, topBanners } = props; 
//   // getBanners是下面的一个函数  topBanners是reducer定义的初始数组

//   useEffect(() => {
//     getBanners();       //发送action
//   }, [getBanners])

//   return (
//     <div>
//       <h2>XHRecommend: {topBanners.length}</h2>
//     </div>
//   )
// }

// //此state是通过Provider将store共享出去的  见App.js
// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// });

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction())
//     //会调用reducer函数
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(XHRecommend));