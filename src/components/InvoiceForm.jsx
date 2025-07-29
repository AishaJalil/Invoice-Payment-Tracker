import styled from "styled-components";
import { Suspense, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_MENU_OPEN,
  NEW_INVOICE,
  UPDATE_INVOICE,
  saveInvoiceToLocalStorage,
} from "../store/invoice/invoiceSlice";
import { nanoid } from "nanoid";
import DeleteIcon from "./DeleteIcon";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 750px;
  height: 100vh;
  padding: 56px 32px 2rem 129px;
  display: flex;
  flex-direction: column;
  background-color: #141624;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  color: white;
  z-index: 2;
  transition: all 0.5s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 12px;
`;

const InputText = styled.input`
  padding: 16px 13px 16px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  outline: none;
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
  color: white;
`;

const ButtonWrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-right: 40px;
  padding-left: 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 24px;
  cursor: pointer;
  padding: 17px 24px;
  color: white;
  font-weight: 700;
  background: ${(props) => props.bgColor || "#252946"};
`;

const AddButton = styled(Button)`
  width: 100%;
  background-color: #252946;
  margin-top: 20px;
`;

const TotalBox = styled.div`
  font-weight: 700;
  color: white;
  font-size: 1rem;
  margin-top: 1rem;
`;

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const menuIsOpen = useSelector((state) => state.invoice.menuIsOpen);
  const editMode = useSelector((state) => state.invoice.edit);
  const invoices = useSelector((state) => state.invoice.invoices);
  const invoice = editMode.status
    ? invoices.filter((item) => item.id === editMode.id)[0]
    : null;
  const invoiceIndex = invoices.findIndex((elem) => elem.id === invoice?.id);

  const [invoiceForm, setInvoiceForm] = useState({
    clientName: "",
    clientEmail: "",
    dueDate: new Date(Date.now()).toISOString().slice(0, 10),
    status: "unpaid",
    services: [],
    total: 0,
  });

  const [error, setError] = useState(false);
  const [serviceTotal, setServiceTotal] = useState(0);

  // Refs for service input
  const serviceNameRef = useRef(null);
  const serviceQtyRef = useRef(null);
  const serviceRateRef = useRef(null);

  // Calculate total price for all services
  const calculateTotal = (services) =>
    services.reduce((acc, item) => acc + item.total, 0);

  // Add new service to the list
  const addService = (e) => {
    e.preventDefault();
    const name = serviceNameRef.current.value;
    const quantity = Number(serviceQtyRef.current.value);
    const rate = Number(serviceRateRef.current.value);

    if (!name || quantity <= 0 || rate <= 0) {
      setError(true);
      return;
    }

    const total = quantity * rate;
    const newService = { name, quantity, rate, total };

    const updatedServices = [...invoiceForm.services, newService];
    setInvoiceForm((prev) => ({
      ...prev,
      services: updatedServices,
      total: calculateTotal(updatedServices),
    }));

    serviceNameRef.current.value = "";
    serviceQtyRef.current.value = 1;
    serviceRateRef.current.value = 0;
    setServiceTotal(0);
    setError(false);
  };

  // Remove a service
  const deleteService = (index) => {
    const updatedServices = invoiceForm.services.filter((_, i) => i !== index);
    setInvoiceForm((prev) => ({
      ...prev,
      services: updatedServices,
      total: calculateTotal(updatedServices),
    }));
  };

  // Save invoice
  const saveInvoice = (type) => {
    if (
      !invoiceForm.clientName ||
      !invoiceForm.clientEmail ||
      invoiceForm.services.length === 0
    ) {
      setError(true);
      return;
    }

    const formData = {
      ...invoiceForm,
      status: invoiceForm.status,
      total: calculateTotal(invoiceForm.services),
    };

    if (!editMode.status) {
      formData.id = nanoid().slice(0, 6).toUpperCase();
      dispatch(NEW_INVOICE(formData));
    } else {
      dispatch(UPDATE_INVOICE({ index: invoiceIndex, newInvoice: formData }));
    }

    dispatch(saveInvoiceToLocalStorage());
    dispatch(SET_MENU_OPEN());
    setInvoiceForm({
      clientName: "",
      clientEmail: "",
      dueDate: new Date(Date.now()).toISOString().slice(0, 10),
      status: "unpaid",
      services: [],
      total: 0,
    });
    setError(false);
  };

  return (
    <Suspense fallback={<div>You are yet to create an invoice</div>}>
      <Container
        style={{
          transform: menuIsOpen ? "translateX(0px)" : "translateX(-750px)",
        }}
      >
        <h2>New Invoice</h2>
        <Form>
          <InputWrapper>
            <Label>Client Name</Label>
            <InputText
              name="clientName"
              value={invoiceForm.clientName}
              onChange={(e) =>
                setInvoiceForm((prev) => ({
                  ...prev,
                  clientName: e.target.value,
                }))
              }
              className={error && !invoiceForm.clientName ? "errorborder" : ""}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Client Email</Label>
            <InputText
              name="clientEmail"
              value={invoiceForm.clientEmail}
              onChange={(e) =>
                setInvoiceForm((prev) => ({
                  ...prev,
                  clientEmail: e.target.value,
                }))
              }
              className={error && !invoiceForm.clientEmail ? "errorborder" : ""}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Due Date</Label>
            <InputText
              type="date"
              name="dueDate"
              value={invoiceForm.dueDate}
              onChange={(e) =>
                setInvoiceForm((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Status</Label>
            <select
              name="status"
              value={invoiceForm.status}
              onChange={(e) =>
                setInvoiceForm((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              style={{
                padding: "16px 13px 16px 20px",
                borderRadius: "4px",
                border: "1px solid hsl(233, 30%, 21%)",
                backgroundColor: "hsl(233, 31%, 17%)",
                color: "white",
                fontWeight: 700,
              }}
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </InputWrapper>

          <div>
            <h3>Services</h3>
            {invoiceForm.services.length > 0 &&
              invoiceForm.services.map((service, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ width: "30%" }}>{service.name}</span>
                  <span style={{ width: "10%" }}>{service.quantity}</span>
                  <span style={{ width: "20%" }}>{service.rate}</span>
                  <span style={{ width: "20%" }}>{service.total}</span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteService(idx)}
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <InputText
                placeholder="Service Name"
                ref={serviceNameRef}
                style={{ width: "30%" }}
                className={
                  error && !serviceNameRef.current?.value ? "errorborder" : ""
                }
              />
              <InputText
                type="number"
                placeholder="Qty"
                ref={serviceQtyRef}
                defaultValue={1}
                min={1}
                style={{ width: "10%" }}
              />
              <InputText
                type="number"
                placeholder="Rate"
                ref={serviceRateRef}
                defaultValue={0}
                min={0}
                style={{ width: "20%" }}
              />
              <AddButton onClick={addService}>Add Service</AddButton>
            </div>
          </div>

          <TotalBox>
            Total:{" "}
            <span style={{ marginLeft: 8 }}>
              &#36;{invoiceForm.total.toFixed(2)}
            </span>
          </TotalBox>
        </Form>

        <ButtonWrapper>
          <Button bgColor="#252946" onClick={() => dispatch(SET_MENU_OPEN())}>
            Discard
          </Button>
          <div>
            <Button bgColor="#7b5cfa" onClick={() => saveInvoice("new")}>
              Save &amp; Send
            </Button>
          </div>
        </ButtonWrapper>
      </Container>
    </Suspense>
  );
};

export default InvoiceForm;
// ...end of file...
