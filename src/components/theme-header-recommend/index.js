//复用组件：不知道怎么说   就是热门推荐、新碟上架、榜单
import React, { memo } from 'react';
import PropTypes from 'prop-types';     //组件传递属性校验  之前讲过

import { HeaderWrapper } from './style';

const XHThemeHeaderRCM = memo(function(props) {
  const { title, keywords } = props;

  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <a href="todo">{item}</a>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <a href="todo">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
})

XHThemeHeaderRCM.propTypes = {
  //属性是什么类型
  title: PropTypes.string.isRequired, //必传
  keywords: PropTypes.array
}

XHThemeHeaderRCM.defaultProps = {
  //没有传值的话是undefined会报错  所以设置默认值为空数组  
  keywords: []
}

export default XHThemeHeaderRCM;
