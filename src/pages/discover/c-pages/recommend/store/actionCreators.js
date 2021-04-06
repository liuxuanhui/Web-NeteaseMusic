import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUM,
  CHANGE_UP_RANKING,
  CHANGE_NEW_RANKING,
  CHANGE_ORIGIN_RANKING,
  CHANGE_SETTLE_SONGER
} from './constants';
import { 
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList,
  getArtistList
} from '@/services/recommend';

const changeTopBannerAction = (res) => ({
  type:CHANGE_TOP_BANNERS,
  topBanners:res.banners
})
const changeHotRecommendAction = (res) => ({
  type: CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})
const changeNewAlbumAction = (res) => ({
  type: CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})
const changeUpRankingAction = (res) => ({
  type: CHANGE_UP_RANKING,
  upRanking: res.playlist
})

const changeNewRankingAction = (res) => ({
  type: CHANGE_NEW_RANKING,
  newRanking: res.playlist
})

const changeOriginRankingAction = (res) => ({
  type: CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

const changeSettleSingsAction = (res) => ({
  type: CHANGE_SETTLE_SONGER,
  settleSings: res.artists
})



export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      //获取数据
      // console.log(res);
      dispatch(changeTopBannerAction(res))
    })  
  }
}

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
       dispatch(changeHotRecommendAction(res));
    })  
  }
}

/*
步骤2： 
  内部调用getNewAlbums 作用：请求数据
  then后面是传给dispatch一个对象，内部会执行reducer函数 作用：将数据保存到reducer
*/
export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch(changeNewAlbumAction(res));
    })
  }
}

export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res));
          break;
        case 2:
          dispatch(changeNewRankingAction(res));
          break;
        case 3:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  }
}

export const getSettleSingers = () => {
  return dispatch => {
    getArtistList(5, 5001).then( res => {
      console.log(res);
      dispatch(changeSettleSingsAction(res))
    })
  }
}