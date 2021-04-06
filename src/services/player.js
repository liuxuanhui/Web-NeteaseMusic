import request from './request';

export function getSongDetail(ids) { 
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getLyric(id) {  //请求歌词
  return request({
    url: "/lyric",
    params: {
      id
    }
  })
}