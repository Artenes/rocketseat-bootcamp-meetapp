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
      font-size: 18px;
      line-height: 32px;
    }
  }

  ul {
    display: flex;
    /**TODO fix allignment of icon and text */
    align-items: center;
    color: rgba(255, 255, 255, 0.6);

    li:first-child {
      margin-right: 30px;
    }

    svg {
      color: rgba(255, 255, 255, 0.6);
      margin-right: 10px;
    }
  }
`;
