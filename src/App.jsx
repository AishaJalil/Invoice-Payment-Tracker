import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import Routers from "./routers/Routers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoicesFromLocalStorage } from "./store/invoice/invoiceSlice";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoicesFromLocalStorage());
    // eslint-disable-next-line
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <InvoiceForm />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
