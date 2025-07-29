import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsOpen: false,
  edit: { status: false, id: null },
  invoices: [],
  filter: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    SET_MENU_OPEN(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_EDIT(state, { payload }) {
      state.edit = { ...payload };
    },
    SET_FILTER(state, { payload }) {
      state.filter = payload;
    },
    SET_INVOICE(state, { payload }) {
      state.invoices = payload;
    },
    NEW_INVOICE(state, { payload }) {
      state.invoices.push(payload);
    },
    UPDATE_INVOICE(state, { payload }) {
      const idx = state.invoices.findIndex((inv) => inv.id === payload.id);
      if (idx !== -1) {
        console.log("Updating invoice:", state.invoices[idx], "to", payload);
        state.invoices[idx] = { ...payload };
      }
    },
    DELETE_INVOICE(state, { payload }) {
      state.invoices.splice(payload, 1);
    },
    MARK_PAID(state, { payload }) {
      state.invoices[payload].status = "Paid";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_MENU_OPEN,
  SET_EDIT,
  SET_FILTER,
  NEW_INVOICE,
  UPDATE_INVOICE,
  MARK_PAID,
  DELETE_INVOICE,
  SET_INVOICE,
} = invoiceSlice.actions;

export const fetchInvoicesFromLocalStorage = () => (dispatch, getState) => {
  const invoices = localStorage.getItem("invoices");

  dispatch(SET_INVOICE(invoices ? JSON.parse(invoices) : []));
};

export const saveInvoiceToLocalStorage = () => (dispatch, getState) => {
  const invoices = getState().invoice.invoices;

  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export default invoiceSlice.reducer;
