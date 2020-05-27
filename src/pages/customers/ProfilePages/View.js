import React from "react"
import Table from '../../../components/table/Table';

const ProfileView = props => {
  const userData = [
    ["Key", "Value"],
    [
      "Username",
      "USERNAME",
    ],
    [
      "Email",
      "EMAIL",
    ],
    [
      "First Name",
      "FIRSTNAME"
    ],
    [
      "Last Name",
      "LASTNAME",
    ],
    [
      "Address",
      "ADDRESS"
    ],
    [
      "Phone Number",
      "PHONE NUMBER"
    ]
  ]
  
  /* TODO: REPLACE ME */
  const orderData = [
    ["ORDER", "DATA"],
    ["ORDER 1", "WHATEVER"]
  ]

  return (
    <>
        <h1>User Account</h1>
        <Table
          tableData={userData}
        />
        <h1>Order History</h1>
        <Table
          tableData={orderData}
        />
    </>
  )
}

export default ProfileView
