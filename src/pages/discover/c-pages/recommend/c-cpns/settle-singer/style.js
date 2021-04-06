import styled from 'styled-components';

export const Singer = styled.div`
  margin-top: 20px;
  width: 250px;
  height: 416px;

  .singer-header {
    margin: 0 auto;
    width: 210px;
    height: 24px;
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid grey;

    span{
      color: #333;
      font-weight: bold;
    }
  }

  .singer-content {
    width: 230px;
    height: 380px;
    margin: 6px 0 14px 20px;
    
    .content-wrap {
      display: flex;
      margin-top: 10px;
      text-decoration: none;

      .info{
        width: 148px;
        height: 62px;
        padding-left: 14px;
        border: 1px solid #e9e9e9;
        background-color: rgb(250,250,250);

        &:hover{
          background-color: rgb(234,234,234);
        }

        .artist-name {
          margin-top: 8px;
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }

        .artist {
          margin-top: 8px;
          font-size: 12px;
        }
      }
    }
  }
`