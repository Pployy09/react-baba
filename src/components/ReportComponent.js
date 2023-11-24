import { useContext } from "react";
import DataContext from "../data/DataContext";
import "./ReportComponent.css";

const ReportComponent = () => {
  const { income, expense } = useContext(DataContext);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div>
      <div className="cricle">
        <div className="showmoney">
          <h4 className="h4">ยอดคงเหลือ (บาท)</h4>
          <h1 className="h1">
            ฿ {formatNumber((income - expense).toFixed(2))}
          </h1>
        </div>
      </div>
      <div className="report-container">
        <div>
          <h4>รายรับทั้งหมด</h4>
          <p className="report plus">{formatNumber(income)}</p>
        </div>
        <div>
          <h4>รายจ่ายทั้งหมด</h4>
          <p className="report minus">{formatNumber(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;