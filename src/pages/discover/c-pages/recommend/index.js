import React, {memo} from 'react'
// import { connect } from 'react-redux'

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'
import XHTopBanner from './c-cpns/top-banner';
import XHHotRecommend from './c-cpns/hot-recommend';
import XHNewAlbum from './c-cpns/new-album';
import XHRecomendRanking from './c-cpns/recommend-ranking';
import XHUserLogin from './c-cpns/user-login';
import XHSettleSinger from './c-cpns/settle-singer';
import XHHotAnchor from './c-cpns/hot-anchor';

//shallowEqual, useDispatch, useSelector转到recommend/c-pns/top-banner下面的index文件里了
function XHRecommend(props) {

  return (
    <RecommendWrapper>
      <XHTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <XHHotRecommend/>
          <XHNewAlbum/>
          <XHRecomendRanking/>
        </RecommendLeft>
        <RecommendRight>
          <XHUserLogin/>
          <XHSettleSinger/>
          <XHHotAnchor/>
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(XHRecommend);

