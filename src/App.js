//第三方
import React, {memo, Suspense} from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; //通过Provider 将store共享出去

//功能性
import routes from './router';
import store from './store';

//组件
import XHAppHeader from '@/components/app-header';
import XHAppFooter from '@/components/app-footer';
import XHAppPlayerBar from './pages/player/app-player-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <XHAppHeader/>
        <Suspense fallback={<div>page loading</div>}>    
          {/*Suspense 路由懒加载所需要的标签 作用：页面未加载时要显示什么内容 fallback也可以传组件*/}
          {renderRoutes(routes)}
        </Suspense>
        <XHAppFooter/>
        <XHAppPlayerBar/>
    </HashRouter>
    </Provider>
  )
})

