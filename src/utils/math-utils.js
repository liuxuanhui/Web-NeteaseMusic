export function getRandomNumber(num) {
  //Math.random()随机生成一个0到1的数
  return Math.floor(Math.random() * num);	//随机数并向下取整
}