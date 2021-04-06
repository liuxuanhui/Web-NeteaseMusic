import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import XHThemeHeaderRCM from '@/components/theme-header-recommend'
import XHTopRanking from '@/components/top-ranking';
import { RankingWrapper } from './style';
import { getTopListAction } from '../../store/actionCreators';


export default memo(function HYRecomendRanking() {

  const { upRanking, newRanking, originRanking } = useSelector(state => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"]),
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <XHThemeHeaderRCM title="榜单" />
      <div className="tops">
        <XHTopRanking info={originRanking}/>
        <XHTopRanking info={upRanking}/>
        <XHTopRanking info={newRanking}/>
      </div>
    </RankingWrapper>
  )
})