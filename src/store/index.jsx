import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice/invoiceSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});
