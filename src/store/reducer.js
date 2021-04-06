//合并reducer
// import { combineReducers } from 'redux';  
import { combineReducers } from 'redux-immutable';  
//用map不合适的理由
//1.由于这里操作时非常频繁的  合并一个reducer就要返回一个新对象是不合理的   
//2.普通combineReducers取不出来Object.keys(obj)的key  因为已经变成immutable对象了

//重命名
import {reducer as recommendReducer} from '../pages/discover/c-pages/recommend/store';
import {reducer as playerReducer} from '../pages/player/store';

const cReducer = combineReducers({  
  recommend: recommendReducer,   //变成immutable对象了
  player: playerReducer
});

export default cReducer