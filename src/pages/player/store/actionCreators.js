import { getSongDetail, getLyric } from '@/services/player';  //获取歌曲信息
import { getRandomNumber } from '@/utils/math-utils'; //随机数并向下取整
import { parseLyric } from '@/utils/parse-lyric';   //歌词解析

import * as actionTypes from './constants';

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
});
const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
});
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
});
const changLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
})

// 对外暴露的action
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
});
export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index
});

export const changeCurrentIndexAndSongAction = (tag) => {
  //这里拿不到dispatch对象  所以这样写 之前讲过
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    const sequence = getState().getIn(["player", "sequence"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);

    switch (sequence) {
      case 1: // 随机播放
        let randomIndex = getRandomNumber(playList.length);
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        currentSongIndex = randomIndex;
        break;
      default: // 顺序播放 因为单曲循环与循环播放的列表是一样的，所以点击上一首或下一首都是同样的歌曲
        currentSongIndex += tag;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
    }

    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));

    // 请求歌词
    dispatch(getLyricAction(currentSong.id));
  }
}

export const getSongDetailAction = (ids) => {
  return (dispatch,getState) => {
    //1.根据id查找playList中是否已经有了该歌曲
    const playList = getState().getIn(["player","playList"]);
    //findIndex高阶函数 如果找到就返回其索引值  没有就返回-1
    const songIndex = playList.findIndex(song => song.id === ids);
    // 2.判断是否找到歌曲
    let song = null;
    if (songIndex !== -1) {   //找到歌曲
      dispatch(changeCurrentSongIndexAction(songIndex));  //改变歌曲索引值
      song = playList[songIndex];
      dispatch(changeCurrentSongAction(song));  //改成当前播放歌曲
      dispatch(getLyricAction(song.id));    //请求歌曲的歌词
    } else { // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0];
        if (!song) return;  //没有值啥也不做

        // 1.将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList];
        newPlayList.push(song);

        // 2.更新redux中的值
        dispatch(changePlayListAction(newPlayList));//添加到播放过的歌曲
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));//改变歌曲索引值
        dispatch(changeCurrentSongAction(song));//改成当前播放歌曲

        dispatch(getLyricAction(song.id));    //请求歌曲的歌词
      })
    }
  }
}

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric;
      // console.log(lyric);     //可以去看看格式
      const lyricList = parseLyric(lyric);  //歌词解析
      // console.log(lyricList);
      dispatch(changLyricListAction(lyricList));
    })
  } 
}