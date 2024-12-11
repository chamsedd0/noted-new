import styled from "styled-components";



const CoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #383838;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px;
  flex: 1;
  margin-top: 70px;

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

const BoxReplacement = styled.div`
  flex: 1;
  min-width: 445px;

  @media (max-width: 1470px) {
    min-width: 360px;
  }

  @media (max-width: 1200px) {
    min-width: 300px;
  }

  @media (max-width: 1020px) {
    min-width: 170px;
  }

  @media (max-width: 900px) {
    min-width: 80px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ProfileSidebar = styled.div`
  position: fixed;
  width: 445px;
  max-height: 400px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: #444444;
  color: white;
  padding: 20px;

  @media (max-width: 1470px) {
    width: 360px;
  }

  @media (max-width: 1200px) {
    width: 300px;
  }

  @media (max-width: 1020px) {
    width: 170px;
  }

  @media (max-width: 900px) {
    width: 80px;
    gap: 10px;
    left: 20px;
  }

  @media (max-width: 700px) {
    right: 20px;
    left: auto;
  }

  h2 {
    align-self: start;
    margin-bottom: 20px;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  #logout {
    color: #fe8686;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${({ active }) => (active ? "#545454" : "transparent")};
  width: 100%;
  height: 60px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  justify-content: start;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  overflow: hidden;

  @media (max-width: 1020px) {
    padding: 0px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 60px;
  }

  span {
    @media (max-width: 1020px) {
      display: none;
    }
  }

  &:hover {
    background: #545454;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;

  @media (max-width: 700px) {
    max-width: 80%;
  }

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;

    @media (max-width: 700px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 16px;
    color: white;
    max-width: 588px;

    @media (max-width: 700px) {
      font-size: 14px;
      max-width: 350px;
    }

    b {
      font-size: 24px;
    }
  }

  button {
    margin-top: 20px;
  }

  .outlook {
    margin-top: 10px;
    color: white;
    height: 48px;
    padding: 0rem 2rem;
    background-color: #127cd6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    img {
      width: 24px;
    }

    &:hover {
      background-color: #126ebc;
    }
  }
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 30px;

  img {
    border-radius: 100%;
    width: 150px;

    @media (max-width: 700px) {
      width: 75px;
    }
  }

  span {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    color: white;
    cursor: pointer;

    @media (max-width: 700px) {
      font-size: 14px;
    }

    img {
      width: 24px;
      border-radius: 0px;
    }
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns */
  gap: 20px; /* Space between form items */
  max-width: 600px;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 700px) {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
`;

const RightBoxReplacement = styled.div`
  @media (max-width: 1400px) {
    display: none;
  }
`;


export {
    CoursesLayout,
    ContentWrapper,
    BoxReplacement,
    ProfileSidebar,
    Button,
    Section,
    ProfilePicture,
    InputsContainer,
    RightBoxReplacement
}