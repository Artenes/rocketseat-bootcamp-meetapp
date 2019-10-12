import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
  color: #fff;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    h1 {
      font-size: 32px;
    }

    nav {
      display: flex;

      a:first-child {
        margin-right: 15px;
      }

      a,
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        height: 42px;
        color: #fff;
        transition: background 0.2s;

        svg {
          margin-right: 10px;
        }
      }

      a {
        background: #4dbaf9;
        width: 116px;

        &:hover {
          background: ${darken(0.03, '#4dbaf9')};
        }
      }

      button {
        border: 0;
        background: #d44059;
        width: 138px;

        &:hover {
          background: ${darken(0.03, '#d44059')};
        }
      }
    }
  }

  > div {
    img {
      height: 300px;
      width: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    p {
      margin-top: 25px;
      margin-bottom: 30px;
      font-size: 16px;
      line-height: 32px;
      font-weight: normal;
      white-space: pre-wrap;
    }
  }

  ul {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);

    li {
      display: flex;
      align-items: center;
    }

    li:first-child {
      margin-right: 30px;
    }

    svg {
      color: rgba(255, 255, 255, 0.6);
      margin-right: 10px;
    }
  }
`;

export const CancelDialog = styled.div`
  position: fixed;
  background: rgba(64, 40, 69, 0.9);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background: rgba(0, 0, 0, 0.7);
    padding: 30px;
    border-radius: 4px;
  }

  strong {
    display: block;
    font-size: 30px;
    font-weight: normal;
    margin-bottom: 40px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    margin-left: 20px;
    font-size: 18px;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;
