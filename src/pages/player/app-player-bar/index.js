import React, {memo,useCallback,useEffect,useRef, useState} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
import { Slider, message } from 'antd';

import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';
import { 
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction 
} from '../store/actionCreators';

export default memo(function XHAppPlayerBar() {
//props and state
  const [currentTime, setCurrentTime] = useState(0);  //记录当前已经播放的时间
  const [progress, setProgress] = useState(0);  //进度条  注意其值是整数
  const [isChanging, setIsChanging] = useState(false);  //是否正在拖动进度条
  const [isPlaying, setIsPlaying] = useState(false);  //歌曲播放或停止

//redux hook
  const { currentSong, sequence, playList,lyricList,currentLyricIndex } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player", "sequence"]), //歌曲播放模式
    playList: state.getIn(["player", "playList"]),  //已播放歌曲数量
    lyricList: state.getIn(["player", "lyricList"]),  //歌词数组
    currentLyricIndex: state.getIn(["player", "currentLyricIndex"]) //此时此刻的歌词
  }),shallowEqual);
  const dispatch = useDispatch();

//other hooks
  useEffect(() => {
    dispatch(getSongDetailAction(1479515580)) //网页默认歌曲
  },[dispatch]);
  const audioRef = useRef();
  useEffect(() =>  {
    audioRef.current.src = getPlaySong(currentSong.id); //给audio设置src
    audioRef.current.play().then(res => { //谷歌浏览器不允许打开页面就自动播放
      //play返回的是promise对象
      setIsPlaying(true);   //点击上一首或下一首会自动播放
    }).catch(err => {
      setIsPlaying(false);  //打开页面自动播放会引起报错 就catch
    });
  }, [currentSong]);

//other handle
  //一开始currentSong.al没有值  undefined.picUrl会让页面报错 所以当currentSong.al有值时再把真的值给picUrl
  const picUrl = currentSong.al && currentSong.al.picUrl;   //歌曲图片路径
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手"; //这样写更加严谨
  const duration = currentSong.dt || 0;   //歌曲总时长  以毫秒为单位
  const showDuration = formatDate(duration, "mm:ss");   //封装总时长展示的格式
  const showCurrentTime = formatDate(currentTime, "mm:ss"); //封装已播放时长

//handle function
  const playMusic = useCallback(() => { 
    //由于sliderAfterChange依赖playMusic 但playMusic每次都会重新创建 所以加useCallback
    //播放与停止音乐  此为audio自带的属性
    isPlaying ? audioRef.current.pause(): audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdate = (e) => {
    // console.log(e.target.currentTime);  
    if(!isChanging) {
      //此时间以秒为单位 封装时间格式传入的是毫秒 所以乘1000 
      setCurrentTime(e.target.currentTime * 1000); 
      // 当前时间/总时间 但进度条的值是整数，所以乘100
      setProgress(currentTime / duration * 100);
    }

    // 获取此时此刻的歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (e.target.currentTime * 1000 < lyricItem.time) { 
        break;
      }
    }
    //i-1是因为当前播放时间小于下一句歌词的时间所以拿上一句的歌词
    // console.log(lyricList[i-1]);  
    if (currentLyricIndex !== i - 1) {  //为了不频繁的dispatch
      dispatch(changeCurrentLyricIndexAction(i - 1));
      const content = lyricList[i - 1] && lyricList[i - 1].content  //有内容的时候再取content
      message.open({  //open是antd里面message自带的
        key: "lyric",   //key是open的参数  当key相同的时候只出现一个message否则多个
        content: content, //content是open的参数  显示的内容
        duration: 0,    //duration是open的参数    多少毫秒之后关闭掉  0是不关闭
        className: "lyric-class",  //添加class属性
        style: {display: (isPlaying ? "inline":"none")},   //行内样式
      })
    }
  }

  const changeSequence = () => {  //更改歌曲播放模式
    let currentSequence = sequence + 1; 
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  }
  const changeMusic = (tag) => {  //依据播放模式更改歌曲
    //因为逻辑太多所以放actionCreators里
    dispatch(changeCurrentIndexAndSongAction(tag)); 
  }
  const handleMusicEnded = () => {  //歌曲播放完之后调用的函数
    if (sequence === 2) { // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {  //循环播放与随机播放已经在changeCurrentIndexAndSongAction里面判断了
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  }


//useCallback在把回调函数传到自定义组件内部的时候使用  Slider是antd定义好的自定义组件
  const sliderChange = useCallback((value) => {
    // console.log("sliderChange：",value);
    setIsChanging(true);  //正在滑动进度条 停止歌曲播放时设置进度条进度
    const currentTime = value / 100 * duration / 1000;
    setCurrentTime(currentTime * 1000); //正在滑动的时候也改变时间进度
    setProgress(value);
  },[duration]);
  const sliderAfterChange = useCallback((value) => {
    // console.log("sliderAfterChange：",value);
    const currentTime = value / 100 * duration / 1000;   // 已播放时间/总时长=进度条
    audioRef.current.currentTime = currentTime;   //进度条滑到哪 歌曲播放到哪
    setCurrentTime(currentTime * 1000); //timeUpdate里面的setCurrentTime有点延迟 所以在这里先调一次
    setIsChanging(false);   //停止滑动进度条 打开歌曲播放设置进度条
 
    if(!isPlaying) {  
      playMusic();  //当音乐暂停时 滑动进度条 音乐会播放
    }
  },[duration, isPlaying, playMusic]);

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_player play" onClick={e => playMusic()}></button>
          <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt=""/>
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="#/" className="singer-name">{singerName}</a>
            </div>
            <div className="progress">
              <Slider defaultValue={0} 
              value={progress}
              onChange={sliderChange}
              onAfterChange={sliderAfterChange}/>
{/*Slider自带-> defaultValue是初始值 value是设置当前取值  
onchange：当Slider的值发生改变时，会触发的事件   一直滑动就会调用
onAfterChange： 鼠标抬起会把当前值作为参数传入
*/}
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
               </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>  {/* 根据sequence决定是什么图标 */}
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_player btn playlist">{playList.length}</button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded}/>
      {/* 
      audio自带的回调函数：
        onTimeUpdate：歌曲播放进度一改变就调用 利用此可以拿到当前播放了多少时间
        onEnded：歌曲播放完结束调用
      */}
    </PlaybarWrapper> 
  )
});