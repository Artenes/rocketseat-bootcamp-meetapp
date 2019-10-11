import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 20px;
  width: 100%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      width: 100%;
      height: 300px;

      svg {
        color: rgba(255, 255, 255, 0.3);
        margin-bottom: 15px;
      }

      p {
        color: rgba(255, 255, 255, 0.3);
        font-size: 20px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    img {
      width: 100%;
      height: 300px;
      border-radius: 4px;
      object-fit: cover;
    }

    input {
      display: none;
    }
  }
`;
