import "./App.css";
import ClassTable from "./components/ClassTable";
import TableNavbar from "./components/TableNavbar";
import Xtable from "./components/Xtable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Router>
        <TableNavbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/ftable" element={<Xtable />} />
          <Route path="/ctable" element={<ClassTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
