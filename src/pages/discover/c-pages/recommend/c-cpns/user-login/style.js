import styled from 'styled-components';

export const User = styled.div`
  width: 250px;
  height: 126px;
  background-position: 0 0;

  .word {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666;
  }

  .user-button{
    display:block;
    margin: 0 auto;
    width: 100px;
    height: 31px; 
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    background-position: 0 -195px;

    &:hover{
      background-position: -110px -195px;
    }
  }
`