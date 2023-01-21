import "./App.css";
import ClassTable from "./components/Tables/ClassTable";
import TableNavbar from "./components/Navbar/TableNavbar";
import Xtable from "./components/Tables/Xtable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import ClassCounter from "./components/Counter/ClassCounter";
import RpG from "./components/RPG/RpG";
// import TableFooter from "./components/Footer/TableFooter";
function App() {
  return (
    <>
      <Router>
        <TableNavbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/ftable" element={<Xtable />} />
          <Route path="/ctable" element={<ClassTable />} />
          <Route path="/counter" element={<ClassCounter />} />
          <Route path="/rpg" element={<RpG />} />
        </Routes>
        {/* <TableFooter /> */}
      </Router>
    </>
  );
}

export default App;
