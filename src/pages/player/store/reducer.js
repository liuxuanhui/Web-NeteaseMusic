import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  currentSong: {},      //当前播放的歌曲
  playList: [],         //用户播放过的歌曲
  currentSongIndex: 0,  //当前播放歌曲的索引值 
  sequence: 2,    //0循环播放  1随机播放  2单曲循环   默认单曲循环
  lyricList:[],   //歌词数组
  currentLyricIndex: 0
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.playList);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index);
    case actionTypes.CHANGE_SEQUENCE:
      return state.set("sequence", action.sequence);
    case actionTypes.CHANGE_LYRIC_LIST:
      return state.set("lyricList", action.lyricList);
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return state.set("currentLyricIndex", action.index);
    default:
      return state;
  }
}

export default reducer;

