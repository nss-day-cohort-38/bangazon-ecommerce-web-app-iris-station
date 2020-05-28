import React, {useState, useEffect} from "react"
import Table from '../../../components/table/Table';
import Button from '@material-ui/core/Button';

const ProfileView = props => {
  const [userTableData, setUserTableData] = useState([]);
  const userData = props.userData;
  
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
  // const orderData = [
  //   ["ORDER", "DATA"],
  //   ["ORDER 1", "WHATEVER"]
  // ]

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      const table = makeUserTable(userData)
      setUserTableData(table)
    }
  }, [userData]);

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
                onClick={()=> props.setProfileView("edit")}
              >
                Edit
              </Button>
            </>
          : <></>
        }
        {/* TODO: REPLACE ME */}
        {/* <h1>Order History</h1>
        <Table
          tableData={orderData}
        /> */}
    </>
  )
}

export default ProfileView
