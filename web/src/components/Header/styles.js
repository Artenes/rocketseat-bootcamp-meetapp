import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 31px;
      height: 32px;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  color: #fff;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      color: #999;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    }
  }

  button {
    width: 71px;
    height: 42px;
    background: #d44059;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    margin-left: 20px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;
