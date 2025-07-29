import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import InvoiceHeader from "../components/InvoiceHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  UPDATE_INVOICE,
  saveInvoiceToLocalStorage,
} from "../store/invoice/invoiceSlice";

const Wrapper = styled.main`
  padding: 50px 140px 50px 180px;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 1024px) {
    padding: 80px 120px 20px 120px;
  }
  @media screen and (max-width: 768px) {
    padding: 80px 20px 20px 20px;
  }
`;

const Card = styled.div`
  background: #23243a;
  color: #fff;
  border-radius: 12px;
  margin-bottom: 24px;
  padding: 24px 32px;
  box-shadow: 0 2px 8px rgba(20, 22, 36, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InvoiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
`;

const InvoiceId = styled.span`
  font-weight: 700;
  color: #fff;
  margin-right: 32px;
`;

const Due = styled.span`
  color: #bfc3e3;
  margin-right: 32px;
`;

const Client = styled.span`
  color: #fff;
  margin-right: 32px;
`;

const Total = styled.span`
  font-weight: 700;
  color: #fff;
  margin-right: 32px;
  font-size: 1.2rem;
`;

const StatusBox = styled.span`
  background: #232a3a;
  border-radius: 10px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: ${(props) => (props.status === "paid" ? "#33d7a0" : "#ff9100")};
`;

const Dot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.status === "paid" ? "#33d7a0" : "#ff9100")};
`;

const Arrow = styled.span`
  color: #a385fa;
  font-size: 1.2rem;
  margin-left: 16px;
`;

const ToggleButton = styled.button`
  margin-left: 16px;
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: #44446a;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #7b5cfa;
  }
`;

const Home = (props) => {
  const invoices = useSelector((state) => state.invoice.invoices);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "React Invoice App";
  }, []);

  const filteredInvoice = invoices.filter((item) => {
    if (filter.length === 0) return true;
    return filter.includes(item.status.toLowerCase());
  });

  const toggleStatus = (invoice) => {
    const newStatus =
      invoice.status.toLowerCase() === "paid" ? "unpaid" : "paid";
    dispatch(UPDATE_INVOICE({ ...invoice, status: newStatus }));
    dispatch(saveInvoiceToLocalStorage());
  };
  return (
    <Wrapper>
      <InvoiceHeader
        filter={filter}
        setFilter={setFilter}
        invoiceCount={filteredInvoice.length}
      />
      <Suspense fallback={<div>loading...</div>}>
        {filteredInvoice.map((invoice) => (
          <Card
            key={invoice.id}
            onClick={() => navigate(`/invoice/${invoice.id}`)}
            style={{ cursor: "pointer" }}
          >
            <InvoiceInfo>
              <InvoiceId>#{invoice.id}</InvoiceId>
              <Due>Due: {invoice.dueDate || invoice.invoiceDue}</Due>
              <Client>{invoice.clientName}</Client>
              <Total>${invoice.total}</Total>
            </InvoiceInfo>
            <StatusBox status={invoice.status.toLowerCase()}>
              <Dot status={invoice.status.toLowerCase()} />
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </StatusBox>
            <Arrow>&#8250;</Arrow>
            <ToggleButton
              onClick={(e) => {
                e.stopPropagation();
                toggleStatus(invoice);
              }}
            >
              Mark as{" "}
              {invoice.status.toLowerCase() === "paid" ? "Unpaid" : "Paid"}
            </ToggleButton>
          </Card>
        ))}
      </Suspense>
    </Wrapper>
  );
};

export default Home;
