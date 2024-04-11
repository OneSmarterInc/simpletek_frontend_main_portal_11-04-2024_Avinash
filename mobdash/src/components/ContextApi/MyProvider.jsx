import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [showUploading, setShowUploading] = useState(true);
  const [showRDD, setShowRDD] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Organisation");
  const [data, setData] = useState([]);
  const newBillUrl = "http://localhost:5173/viewbills";
  const newContractUrl = "http://localhost:5173/viewcontract";
  // const newBillUrl="https://mobdash.vercel.app/#/viewbills"
  // const newContractUrl = "https://mobdash.vercel.app/#/viewcontract";

  const newTab = "http://localhost:5173/newtab";
  // const newTab = "https://mobdash.vercel.app/#/newtab";

  const [baseData, setBaseData] = useState({});
  return (
    <MyContext.Provider
      value={{
        showRDD,
        setShowRDD,
        showMapping,
        setShowMapping,
        showUploading,
        setShowUploading,
        filteredData,
        setFilteredData,
        baseData,
        setBaseData,
        selectedOption,
        setSelectedOption,
        data,
        setData,
        newContractUrl,
        newBillUrl,
        newTab
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
