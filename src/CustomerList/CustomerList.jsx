import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  /**========================Get All customer data===================== */
  
  useEffect(() => {
    const customersData = JSON.parse(localStorage.getItem("allUser"));
    setAllCustomer(customersData);
  }, []);

  /**========================Get All customer data===================== */


  return (
    <div className="p-4 ">
        <h2>Customer List</h2>
        <Link to="/" className="btn btn-outline-primary">Go back</Link>
        <hr />
      <table className="table table-hover border">
        <thead className="bg-dark text-white">
          <tr>
            <th>Full Name</th>
            <th>PAN Number</th>
            <th>Email</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>Post Code</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table justify-content-start align-items-start">
          {allCustomer.length > 0 &&
            allCustomer.map((customer, index) => {
              return (
                <tr
                  key={index}
                  className="justify-content-start align-items-start"
                >
                  <td>{customer?.fullName}</td>
                  <td>{customer?.panNumber}</td>
                  <td>{customer?.email}</td>
                  <td>{customer?.addressLine1}</td>
                  <td>{customer?.addressLine2}</td>
                  <td>{customer?.postCode}</td>
                  <td>{customer?.city}</td>
                  <td>{customer?.state}</td>
                  <td className="d-flex justify-content-around">
                    <button className="btn btn-danger">
                        <DeleteIcon />
                    </button>
                    <button className="btn btn-warning">
                        <EditIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
