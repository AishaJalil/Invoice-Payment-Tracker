import styled from "styled-components";
import { Link } from "react-router-dom";

const BackIcon = styled.svg`
  width: 10px;
  height: 10px;
  stroke: currentcolor;
  fill: currentcolor;
`;

const IconText = styled.span`
  color: white;
  font-weight: 700;
  margin-left: 15px;
`;

const PrevButton = (props) => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <BackIcon color="hsl(252, 94%, 67%)" viewBox="0 0 1024 1024">
        <path d="M730.6 18.4l-505.4 505.2 505.4 505.4 144.8-144.8-360.6-360.6 360.6-360.4z"></path>
      </BackIcon>
      <IconText>{props.text}</IconText>
    </Link>
  );
};

export default PrevButton;
