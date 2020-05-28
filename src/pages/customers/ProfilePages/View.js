import React, {useState, useEffect} from "react"
import Table from '../../../components/table/Table';
import {userManager} from '../../../modules'

const ProfileView = props => {
  const [userData, setUserData] = useState([])

  const getUserData = () => {
    const token = window.sessionStorage.getItem("token");
    userManager.getCustomer(token)
      .then(resp => {
        setUserData(makeUser(resp))
      })
  }

  const makeUser = (resp) => {
    const customer = resp
    const user = resp.user
    return [
      ["Username", `${user.username}`],
      ["Email", `${user.email}`],
      ["First Name", `${user.first_name}`],
      ["Last Name", `${user.last_name}`],
      ["Address", `${customer.address}`],
      ["Phone Number", `${customer.phone_number}`]
    ]
  }
  
  /* TODO: REPLACE ME */
  const orderData = [
    ["ORDER", "DATA"],
    ["ORDER 1", "WHATEVER"]
  ]

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
        <h1>User Account</h1>
        {userData.length !== 0
          ? <Table
              tableData={userData}
            />
          : <></>
        }
        <h1>Order History</h1>
        <Table
          tableData={orderData}
        />
    </>
  )
}

export default ProfileView
