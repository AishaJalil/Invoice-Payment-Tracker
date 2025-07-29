import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_MENU_OPEN, SET_EDIT } from "../store/invoice/invoiceSlice";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled(Box)`
  justify-content: space-between;
  color: #fff;
  margin-bottom: 20px;
`;

const Title = styled.div`
  flex-basis: 50%;

  & > h1 {
    font-weight: 600;
    font-size: clamp(1.25rem, 5vw, 2.3rem);
  }

  & > p {
    font-weight: 500;
  }
`;

const Filter = styled.div`
  position: relative;

  & .filter-btn {
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: 0;
    color: #fff;
  }
`;

const FilterBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 24px;
  background-color: #252946;
  position: absolute;
  top: 40px;
  left: -40px;
  border-radius: 8px;
  gap: 14px;

  @media screen and (max-width: 1024px) {
    padding: 16px;
    top: 40px;
    left: -70px;
    gap: 8px;
  }
`;

const Label = styled.label`
  font-weight: 700;
  margin-left: 10px;

  @media screen and (max-width: 1024px) {
    margin-left: 8px;
  }
`;

const AddButton = styled.button`
  font-weight: 700;
  padding: 15px 20px;
  border: none;
  background-color: #7b5cfa;
  color: hsl(0, 0%, 100%);
  border-radius: 24px;
  outline: none;
  position: relative;
  width: 160px;
  text-align: right;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    padding: 8px 14px;
    width: 80px;
  }

  &:before {
    position: absolute;
    content: "";
    top: 50%;
    left: 6px;
    width: 32px;
    height: 32px;
    background-color: hsl(0, 0%, 100%);
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    transform: translateY(-50%);

    @media screen and (max-width: 1024px) {
      left: 6px;
      width: 20px;
      height: 20px;
    }
  }

  & .icon {
    position: absolute;
    color: #7b5cfa;
    font-size: 20px;
    font-weight: 800;
    left: 14px;
    top: 10px;

    @media screen and (max-width: 1024px) {
      font-size: 16px;
      left: 10px;
      top: 3px;
    }
  }
  & .hide {
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;

// Accept filter and setFilter as props from Home
const InvoiceHeader = ({ filter, setFilter, invoiceCount }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilter((prev) => [...prev, value]);
    } else {
      setFilter((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <Wrapper>
      <Title>
        <h1>Invoices</h1>
        <p>There are {invoiceCount} invoices</p>
      </Title>
      <Filter>
        <button
          className="filter-btn"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          Filter By Status
        </button>

        <FilterBody style={{ display: filterOpen ? "flex" : "none" }}>
          <Box>
            <input
              type="checkbox"
              name="paid"
              value="paid"
              checked={filter.includes("paid")}
              onChange={handleClick}
            />
            <Label htmlFor="paid">Paid</Label>
          </Box>
          <Box>
            <input
              type="checkbox"
              name="unpaid"
              value="unpaid"
              checked={filter.includes("unpaid")}
              onChange={handleClick}
            />
            <Label htmlFor="unpaid">Unpaid</Label>
          </Box>
        </FilterBody>
      </Filter>
      <AddButton
        onClick={() => {
          dispatch(SET_MENU_OPEN());
          dispatch(SET_EDIT({ status: false, id: null }));
        }}
      >
        New <span className="hide">Invoice</span>
        <span className="icon">+</span>
      </AddButton>
    </Wrapper>
  );
};

export default InvoiceHeader;
