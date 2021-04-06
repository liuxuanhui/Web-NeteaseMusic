//歌词解析
/**
[00:00.000] 作曲 : 许嵩
[00:01.000] 作词 : 许嵩
[00:22.240]天空好想下雨
[00:24.380]我好想住你隔壁
[00:26.810]傻站在你家楼下
[00:29.500]抬起头数乌云
[00:31.160]如果场景里出现一架钢琴
[00:33.640]我会唱歌给你听
[00:35.900]哪怕好多盆水往下淋
[00:41.060]夏天快要过去}
 */

//  \[\]将[]转义  (\d{2})匹配两位数字  .也是有特殊含义的，所以也转义  (\d{2,3})匹配两到三位数字
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function parseLyric(lyricString) {
  const lineStrings = lyricString.split("\n");  //以换行分割

  const lyrics = [];
  for (let line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line);   //result是匹配的结果
      // console.log(result);   可以去看里面的result[1]...
      if (!result) continue;    //如果没有匹配到 就继续匹配
      const time1 = result[1] * 60 * 1000;  //分钟转成毫秒
      const time2 = result[2] * 1000;       //秒转成毫秒
      //两位数需要乘10    三位数乘1是为了把字符串变成数字
      const time3 = result[3].length === 3? result[3]*1: result[3]*10;
      const time = time1 + time2 + time3;   //总毫秒时间
      //replace有两个参数(替换的内容，用什么替换)  作曲和作词的开头有空格所以trim了
      const content = line.replace(parseExp, "").trim();  //获取歌词内容
      const lineObj = {time, content};
      // console.log(lineObj);
      lyrics.push(lineObj);
    }
  }
  return lyrics;
}
//返回出去的形式  [{},{},{},{}……]