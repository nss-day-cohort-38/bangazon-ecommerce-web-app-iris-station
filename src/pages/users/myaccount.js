import React from "react"
import Table from '../../components/table/Table'

const MyAccount = props => {
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

export default MyAccount