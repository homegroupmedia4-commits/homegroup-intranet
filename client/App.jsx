import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import News from "./pages/News";
import Groupe from "./pages/Groupe";
import Organisation from "./pages/Organisation";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/groupe" element={<Groupe />} />
          <Route path="/organisation" element={<Organisation />} />
          <Route path="/contact" element={<Contact />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

          <Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
