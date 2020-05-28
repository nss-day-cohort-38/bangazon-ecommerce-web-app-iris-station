import React, {useState, useEffect} from "react"
import Table from '../../../components/table/Table';
import Button from '@material-ui/core/Button';
import {userManager} from '../../../modules';


const ProfileView = props => {
  const [userData, setUserData] = useState({});
  const [userTableData, setUserTableData] = useState([]);
  
  const getUserData = () => {
    const token = window.sessionStorage.getItem("token");
    userManager.getCustomer(token)
      .then(resp => {
        setUserData(resp)
        setUserTableData(makeUserTable(resp))
      })
  }

  const makeUserTable = (resp) => {
    const customer = resp
    const user = resp.user
    return [
      ["User Id", `${customer.user_id}`],
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
        {userTableData.length !== 0
          ? <>
              <Table
                tableData={userTableData}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // onClick={()=> props.history.push(`/customers/edit/${userData.id}`)}
              >
                Edit
              </Button>
            </>
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
