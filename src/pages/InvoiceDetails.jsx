import { useSelector, useDispatch } from "react-redux";
import {
  SET_MENU_OPEN,
  SET_EDIT,
  MARK_PAID,
  DELETE_INVOICE,
  saveInvoiceToLocalStorage,
} from "../store/invoice/invoiceSlice";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevButton from "../components/PrevButton";
import NotFound from "./NotFound";
import jsPDF from "jspdf"; // <-- Add this import
import html2canvas from "html2canvas"; // <-- Add this import

const Wrapper = styled.div`
  padding: 40px 10vw 40px 10vw;
  color: #fff;
`;

const StatusCard = styled.div`
  background: #23243a;
  border-radius: 12px;
  padding: 24px 32px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;

const StatusBody = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 8px;
  padding: 8px 20px;
  margin: 0 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background: #252946;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const MarkButton = styled.button`
  background: #33d7a0;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const Button = styled.button`
  background: #7b5cfa;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  background: #23243a;
  border-radius: 12px;
  padding: 32px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "8px"};
  grid-column: ${(props) =>
    props.start && props.end ? `${props.start} / ${props.end}` : "auto"};
  align-items: ${(props) => props.align || "flex-start"};
`;

const Typography = styled.div`
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || 400};
  color: #fff;
`;

const itemContStyles = {
  gridColumn: "1 / 4",
  marginTop: "32px",
  background: "#1e2238",
  borderRadius: "8px",
  padding: "16px",
  display: "grid",
  gridTemplateColumns: "2fr repeat(3, 1fr)",
  gap: "16px",
};

const amountStyles = {
  gridColumn: "2 / 4",
  background: "#252946",
  borderRadius: "8px",
  padding: "16px 24px",
  marginTop: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const SimpleSection = styled.div`
  background: #23243a;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  color: #fff;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const Label = styled.div`
  font-weight: 600;
  color: #bfc3e3;
`;

const Value = styled.div`
  font-weight: 700;
  color: #fff;
`;

const ServiceTable = styled.table`
  width: 100%;
  margin-top: 18px;
  border-collapse: collapse;
  th,
  td {
    padding: 10px 8px;
    text-align: left;
  }
  th {
    color: #bfc3e3;
    font-weight: 600;
    border-bottom: 1px solid #333;
  }
  td {
    color: #fff;
    font-weight: 500;
    border-bottom: 1px solid #23243a;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${({ status }) =>
    status === "paid" ? "rgba(51,215,160,0.1)" : "rgba(255,145,0,0.1)"};
  color: ${({ status }) => (status === "paid" ? "#33d7a0" : "#ff9100")};
  font-weight: 700;
  border-radius: 16px;
  padding: 6px 18px;
  font-size: 1rem;
  margin-left: 8px;
`;

const InvoiceDetails = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.invoice.edit);
  const invoices = useSelector((state) => state.invoice.invoices);
  const invoice = invoices.filter((elem) => elem.id === params.id)[0] ?? null;
  const invoiceIndex = invoices.findIndex((elem) => elem.id === params.id);

  // PDF Export logic
  const invoiceRef = useRef();

  const exportPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, {
      backgroundColor: "#1e2238",
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${invoice?.id}.pdf`);
  };

  return (
    <Wrapper>
      {invoice ? (
        <>
          <PrevButton text="Go Back" />
          <SimpleSection ref={invoiceRef}>
            <Row>
              <Label>Client Name</Label>
              <Value>{invoice.clientName}</Value>
            </Row>
            <Row>
              <Label>Client Email</Label>
              <Value>{invoice.clientEmail}</Value>
            </Row>
            <Row>
              <Label>Due Date</Label>
              <Value>{invoice.dueDate}</Value>
            </Row>
            <Row>
              <Label>Status</Label>
              <StatusBadge status={invoice.status.toLowerCase()}>
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </StatusBadge>
            </Row>
            <ServiceTable>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.services.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.rate}</td>
                    <td>${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </ServiceTable>
            <Row
              style={{
                marginTop: 24,
                borderTop: "1px solid #333",
                paddingTop: 18,
              }}
            >
              <Label style={{ fontSize: "1.1rem" }}>Total</Label>
              <Value style={{ fontSize: "1.3rem" }}>
                $
                {invoice.total ? invoice.total.toLocaleString("en-US") : "0.00"}
              </Value>
            </Row>
            <Row style={{ justifyContent: "flex-end", marginTop: 32 }}>
              <Button style={{ background: "#33d7a0" }} onClick={exportPDF}>
                Export as PDF
              </Button>
            </Row>
          </SimpleSection>
        </>
      ) : (
        <NotFound />
      )}
    </Wrapper>
  );
};

export default InvoiceDetails;
