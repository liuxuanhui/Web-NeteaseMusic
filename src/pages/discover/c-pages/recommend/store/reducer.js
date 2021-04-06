import {Map} from 'immutable';   //详见00-补充

import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUM,
  CHANGE_UP_RANKING,
  CHANGE_NEW_RANKING,
  CHANGE_ORIGIN_RANKING,
  CHANGE_SETTLE_SONGER
} from './constants';

//默认值
const defaultState = Map({  
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],

  upRanking: {},
  newRanking: {},
  originRanking: {},

  settleSings: [],
})

function reducer(state = defaultState, action) {
  switch(action.type) {
    case CHANGE_TOP_BANNERS:
      return state.set("topBanners",action.topBanners);   //新的对象
    case CHANGE_HOT_RECOMMEND:
      return state.set("hotRecommends",action.hotRecommends); 
    /*
      步骤3. 将数据保存到newAlbums数组  并把数据返回给./index文件 
      再由./index文件返回给store/reducer去合并reducer 然后返回给store  所以说store保存了所有state
    */
    case CHANGE_NEW_ALBUM:
      return state.set("newAlbums",action.newAlbums);
    case CHANGE_UP_RANKING:
      return state.set("upRanking", action.upRanking);
    case CHANGE_NEW_RANKING:
      return state.set("newRanking", action.newRanking);
    case CHANGE_ORIGIN_RANKING:
      return state.set("originRanking", action.originRanking);
    case CHANGE_SETTLE_SONGER:
      return state.set("settleSings", action.settleSings);
    default:
      return state;  
  }
}

export default reducer