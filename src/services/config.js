/**
 *  为什么我们要对axios进行二次封装呢？ 
 *  默认情况下我们是可以直接使用axios来进行开发的； 
 *  但是我们考虑一个问题，假如有100多处中都直接依赖axios，突然间有一天axios出现了重大bug，并且该库已经不再维护
 *  这个时候你如何处理呢？ 大多数情况下我们会寻找一个新的网络请求库或者自己进行二次封装； 
 *  但是有100多处都依赖了axios，方便我们进行修改吗？我们所有依赖axios库的地方都需要进行修改；
 */

 //公司的开发环境和生产环境 大概率不一样
const devBaseURL = "http://123.207.32.32:9001";   //开发环境
const proBaseURL = "https://production.org";  //生产环境
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
