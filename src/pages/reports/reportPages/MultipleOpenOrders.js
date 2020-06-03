import React, { useEffect, useState } from "react";
import { Table } from "../../../components";
import { userManager } from "../../../modules";

const MultipleOpenReports = () => {
  const [tableInformation, setTableInformation] = useState([]);

  useEffect(() => {
    userManager.customerMultipleOpen().then((data) => {
      setTableInformation(
        data.map((user) => [
          user.user.first_name,
          user.user.last_name,
          user.open_order_count,
        ])
      );
    });
  }, []);

  return (
    <Table
      tableData={[
        ["First Name", "Last Name", "Open Orders"],
        ...tableInformation,
      ]}
    />
  );
};

export default MultipleOpenReports;
