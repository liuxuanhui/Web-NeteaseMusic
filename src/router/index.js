import React from 'react'
import { Redirect } from 'react-router-dom'

//React.lazy 懒加载(用到时再加载)  因为加载完所有文件太大 打开页面速度慢 
//Suspense 路由懒加载所需要的标签 作用：页面未加载时要显示什么内容 fallback也可以传组件。 见主App.js文件里
const XHDiscover = React.lazy(() => import("@/pages/discover"));
const XHMine = React.lazy(_ => import("../pages/mine"));
const XHFriend = React.lazy(_ => import("../pages/friend"));

const XHRecommend = React.lazy(_ => import("../pages/discover/c-pages/recommend"));
const XHRanking = React.lazy(_ => import("../pages/discover/c-pages/ranking"));
const XHSongs = React.lazy(_ => import("../pages/discover/c-pages/songs"));
const XHDjradio = React.lazy(_ => import("../pages/discover/c-pages/djradio"));
const XHArtist = React.lazy(_ => import("../pages/discover/c-pages/artist"));
const XHAlbum = React.lazy(_ => import("../pages/discover/c-pages/album"));
const XHPlayer = React.lazy(_ => import("../pages/player"));


// import XHDiscover from '@/pages/discover'
// import XHMine from '@/pages/mine'
// import XHFriend from '@/pages/friend'

// import XHRecommend from "../pages/discover/c-pages/recommend";
// import XHRanking from "../pages/discover/c-pages/ranking";
// import XHSongs from "../pages/discover/c-pages/songs";
// import XHDjradio from "../pages/discover/c-pages/djradio";
// import XHArtist from "../pages/discover/c-pages/artist";
// import XHAlbum from "../pages/discover/c-pages/album";
// import XHPlayer from "../pages/player";


//打开页面就重定向discover页面里
const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: XHDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: XHRecommend
      },
      {
        path: "/discover/ranking",
        component: XHRanking
      },
      {
        path: "/discover/songs",
        component: XHSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: XHDjradio
      },
      {
        path: "/discover/artist",
        component: XHArtist
      },
      {
        path: "/discover/album",
        component: XHAlbum
      },
      {
        path: "/discover/player",
        component: XHPlayer
      }
    ]
  },
  {
    path: "/mine",
    component: XHMine
  },
  {
    path: "/friend",
    component: XHFriend
  },
];

export default routes;