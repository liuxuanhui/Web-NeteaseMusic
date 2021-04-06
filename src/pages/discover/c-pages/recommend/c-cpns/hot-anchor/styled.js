import styled from 'styled-components';

export const HotAnchorWrapper = styled.div`
  width: 250px;

  .hot-anchor{
    display: block;
    width: 210px;
    height: 24px;
    margin: 0 20px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid grey;
  }

  .list {
    margin-top: 20px;

    .list-item{
      display: flex;
      width: 210px;
      height: 50px;
      margin: 0 auto;

      .left {
        
        img{
          cursor: pointer;
        }
      }

      .right{
        margin-left: 10px;
        width: 160px;

        a{
          color: black;
        }

        span{
          display: inline-block;
          width: 11px;
          height: 13px;
          background-position: 0 0;
          vertical-align:middle;
          margin-left: 2px;
        }

        p{
          color: gray;
        }
      }
    }
  }
`