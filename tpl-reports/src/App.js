import { Route, Routes } from "react-router-dom";
import ReportMainContainer from "./components/MainContainer/ReportMainContainer";

function App() {
  return (
    <Routes>
    <Route path="/" element={<ReportMainContainer />}/>
  </Routes>
  );
}

export default App;
