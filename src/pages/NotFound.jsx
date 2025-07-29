import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div``;

const Container = styled(Box)`
  position: relative;
  height: 100vh;
`;

const Wrapper = styled(Box)`
  position: absolute;
  left: 50%;
  top: 40%;
  max-width: 700px;
  width: 100%;
  line-height: 1.5;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  & h2 {
    font-size: 30px;
    color: #000;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0px;
    color: #fff;
    @media screen and (max-width: 480px) {
      font-size: 22px;
    }
  }

  & p {
    font-size: 16px;
    color: #000;
    font-weight: 400;
    text-transform: uppercase;
    margin: 10px 0px;
    color: #fff;
  }

  & a {
    font-family: "Maven Pro", sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    background: #189cf0;
    display: inline-block;
    padding: 16px 38px;
    border: 2px solid transparent;
    border-radius: 40px;
    color: #fff;
    font-weight: 400;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;
  }

  & a:hover {
    background-color: #fff;
    border-color: #189cf0;
    color: #189cf0;
  }
`;
const NotFound = () => {
  return (
    <Container>
      <Wrapper className="notfound">
        <h2>We are sorry, Page not found!</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">Back To Homepage</Link>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
