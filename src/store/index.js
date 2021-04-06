import {createStore,applyMiddleware,compose} from 'redux';  //创建store对象与合并多个中间件、默认compose
import reducer from './reducer';      //合并多个reducer
import thunk from 'redux-thunk';      //中间件

//让Redux调试工具有效果  
//如果安装了插件就能取window的COMPOSE  如果没有安装就使用默认的compose
//把创建出来的东西  包裹applyMiddleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//上面这段代码是在github复制的  在github上搜redux-devtools点第一个往下找

//创建store对象
const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk)
));  

//store中含有合并reducer  reducer返回的是state
export default store

