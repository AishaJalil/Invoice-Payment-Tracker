import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InvoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 15px 32px;
  border: 1px solid #1e2139;
  border-radius: 8px;
  background-color: #1e2139;
  color: white;
  transition: border 350ms ease-in-out;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    border: 1px solid #7b5cfa;
  }

  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 30px;
    grid-template-rows: auto;
    align-items: center;
    row-gap: 10px;
    padding: 16px 16px;
    margin-bottom: 10px;
  }

  & .id {
    flex-basis: 5%;
    font-weight: 700;

    @media screen and (max-width: 1024px) {
      justify-self: start;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
  & .due {
    flex-basis: 30%;
    font-size: 12px;
    text-align: center;

    @media screen and (max-width: 1024px) {
      justify-self: start;
      grid-column-start: 1;
      grid-column-end: 2;
      text-align: start;
    }
  }
  & .name {
    flex-basis: 20%;
    font-size: 12px;
    text-align: left;

    @media screen and (max-width: 1024px) {
      justify-self: end;
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
  & .price {
    font-size: 16px;
    font-weight: 700;
    flex-basis: 25%;

    @media screen and (max-width: 1024px) {
      justify-self: start;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
`;

const Badge = styled.div`
  flex-basis: 15%;
  width: 105px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  font-weight: 700;
  background-color: ${(props) => props.bgColor || "rgba(255, 145, 0, 0.06)"};

  @media screen and (max-width: 1024px) {
    justify-self: end;
    align-self: center;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
`;

const BadgeIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "rgb(255, 145, 0)"};
`;
const BadgeText = styled.div`
  font-size: 12px;
  color: ${(props) => props.textColor || "rgb(255, 145, 0)"};
`;

const Arrow = styled.svg`
  flex-basis: 5%;
  fill: currentcolor;
  width: 10px;
  height: 10px;

  @media screen and (max-width: 1024px) {
    justify-self: end;
    align-self: center;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
  }
`;

const InvoiceCard = (props) => {
  let navigate = useNavigate();
  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  return (
    <InvoiceWrapper onClick={() => navigate(`/invoice/${props.id}`)}>
      <p className="id">#{props.id}</p>
      <p className="due">Due: {props.due}</p>
      <p className="name">{props.name}</p>
      <p className="price">&#36; {props.price}</p>
      <Badge
        className="invoice-status"
        bgColor={
          props.status.toLowerCase() === "draft"
            ? "#292c45"
            : props.status.toLowerCase() === "paid"
            ? "rgba(51, 215, 160, 0.06)"
            : "rgba(255, 145, 0, 0.06)"
        }
      >
        <BadgeIndicator
          bgColor={
            props.status.toLowerCase() === "draft"
              ? "rgb(224, 228, 251)"
              : props.status.toLowerCase() === "paid"
              ? "rgb(51, 215, 160)"
              : "rgb(255, 145, 0)"
          }
        ></BadgeIndicator>
        <BadgeText
          textColor={
            props.status.toLowerCase() === "draft"
              ? "rgb(224, 228, 251)"
              : props.status.toLowerCase() === "paid"
              ? "rgb(51, 215, 160)"
              : "rgb(255, 145, 0)"
          }
        >
          {capitalize(props.status)}
        </BadgeText>
      </Badge>
      <Arrow color="hsl(252, 94%, 67%)" viewBox="0 0 1024 1024">
        <path d="M328.4 30l-144.8 144.8 337.2 337.2-337.2 337.2 144.8 144.8 482-482z"></path>
      </Arrow>
    </InvoiceWrapper>
  );
};

export default InvoiceCard;
