
import HeaderBar from "./HeaderBar";
import Toolbar from "./Toolbar";
import SpreadsheetTable from "./SpreadsheetTable";
import FooterSummary from "./FooterSummary"; // ✅ import this

const Spreadsheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderBar />
      <Toolbar />
      <div className="flex-1 overflow-auto">
        <SpreadsheetTable />
      </div>
      <FooterSummary /> {/* ✅ add this */}
    </div>
  );
};

export default Spreadsheet;
