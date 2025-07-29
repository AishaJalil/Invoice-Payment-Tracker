import { Link } from "react-router-dom";
import profileImg from "../assets/profile.jpg";
import styled from "styled-components";

const Container = styled.header`
  height: 100vh;
  width: 90px;
  background-color: #1e2139;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 3;

  @media screen and (max-width: 1024px) {
    height: 7vh;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0;
  }
`;

const Grid = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled(Grid)`
  height: 103px;
  background-color: #7b5cfa;
  border-bottom-right-radius: 20px;

  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 100%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  background-color: white;
  border-radius: 50%;

  @media screen and (max-width: 1024px) {
    width: 30px;
    height: 30px;
    position: relative;
    background-color: white;
    border-radius: 50%;
  }
`;

const LogoCont = styled.div`
  background: #7b5cfa;
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(80% 0, 20% 0, 50% 50%);
`;

const InfoWrapper = styled(Grid)`
  height: 90px;
  border-top: 1px solid rgb(73, 79, 110);

  @media screen and (max-width: 1024px) {
    width: 90px;
    height: 100%;
    border-left: 1px solid rgb(73, 79, 110);
    border-top: 0;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

Avatar.defaultProps = {
  src: profileImg,
  alt: "profile pic",
};

const Header = () => {
  return (
    <Container>
      <LogoWrapper>
        <Link to="/">
          <Logo>
            <LogoCont></LogoCont>
          </Logo>
        </Link>
      </LogoWrapper>
      <InfoWrapper>
        <a
          href="https://github.com/AishaJalil"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar />
        </a>
      </InfoWrapper>
    </Container>
  );
};

export default Header;
