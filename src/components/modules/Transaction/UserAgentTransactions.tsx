import MyTransactions from "@/components/modules/Wallet/MyTransactions";

import { useState } from "react";

const UserAgentTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="">
      <h5 className="text-center p-3 mb-2">Manage Transactions</h5>
      <MyTransactions
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserAgentTransactions;
