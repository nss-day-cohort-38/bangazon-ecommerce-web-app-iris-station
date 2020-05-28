import React from "react"
import Table from '../../../components/table/Table';
import userManager from '../../../modules'

const ProfileView = props => {
  const [userData, setUserData] = []

  // FIXME: Use token?
  const getUserData = () => {
    userManager.getCustomer(customerId)
    userManager.getUser(userId)
  }

  const makeUser = (userResp, customerResp) => {
    return {
      "Username": `${userResp.username}`,
      "Email": `${userResp.email}`,
      "First Name": `${userResp.first_name}`,
      "Last Name": `${userResp.last_name}`,
      "Address": `${customerResp.address}`,
      "Phone Number": `${cusstomerResp.phoneNumber}`
    }
  }

  const makeUserData = ()  => {
    // For each key/value pair, make an array, append it to this array
    return [
      ["Key", "Value"],
      [
        "Last Name",
        `${}`,
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
  }
  
  /* TODO: REPLACE ME */
  const orderData = [
    ["ORDER", "DATA"],
    ["ORDER 1", "WHATEVER"]
  ]

  useEffect(() => {

  }, []);

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
