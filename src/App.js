import Transaction from "./components/Transaction";
import "./App.css";
import FormComponent from "./components/FormComponent";
import { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//component แม่
//ข้างในแม่มี component ลูก
function App() {
  const design = { color: "#ffda00", textAlign: "center", fontSize: "2rem" };

  const initState = [
    // { id: 1, title: "ค่าเช่าบ้าน", amount: -2000 },
    // { id: 2, title: "เงินเดือน", amount: 12000 },
    // { id: 3, title: "ค่าเดินทาง", amount: -500 },
    // { id: 4, title: "ขายของ", amount: 2000 },
  ];

  const [items, setItems] = useState(initState);

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0); //ค่าบวก
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1; //ค่าลบ
    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  //reducer state
  // const [showReport, setShowReport] = useState(false);
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true);
  //     case "HIDE":
  //       return setShowReport(false);
  //   }
  // };
  // const [result, dispatch] = useReducer(reducer, showReport);

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ-รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" exact element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
