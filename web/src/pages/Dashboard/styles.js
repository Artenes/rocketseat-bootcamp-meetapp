import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
  color: #fff;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 32px;
    }

    a {
      border: 0;
      height: 42px;
      width: 172px;
      background: #f94d6a;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      svg {
        margin-right: 12px;
      }

      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
`;

export const NoMeetup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.1);

  svg {
    margin-bottom: 20px;
  }
`;

export const Meetup = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 20px 30px;
  margin-bottom: 10px;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  &:hover svg {
    transform: translateX(2px);
  }

  strong {
    color: #fff;
    font-size: 18px;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;

    svg {
      margin-left: 23px;
    }
  }
`;
