import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import NoData from "../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import noDataImg from "../../../../assets/images/no-data.png";
import { Button } from "react-bootstrap";
import { DeleteuserById, GetUsers } from "../../../../api/modules/users";
export default function UsersList({loginData}) {
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setUserId(item.id);
    setUserName(item.userName);
    setShow(true);
  };

  const getUserList = async () => {
    try {
      const response = await GetUsers();
      setUserList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };
  const deleteUser = async () => {
    try {
      const response = await DeleteuserById(userId);
      handleClose();
      getUserList();
      toast.success(`Successfully Delete ${userName}`);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />

      <div className="p-5">
        <div>
          <h3 className="mb-0">Users Table Detailss</h3>
          <span>You can check all details</span>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="text-center px-5 ">
          <img src={noDataImg} alt="no-data" className="w-30 mb-3" />
          <h3 className="mb-3">Delete This User ?</h3>
          <p className="text-muted">
            are you sure you want to delete
            <span className="text-success fw-bold ">{userName}</span> ? if you
            are sure just click on delete it
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteUser} variant="danger">
            Delete this user
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="px-5  ">
        {userList.length > 0 ? (
          <table className=" table custom-table ">
            <thead>
              <tr>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">Country</th>
                <th scope="col">Role</th>
                <th scope="col">Creation Data</th>
                <th scope="col">Modifiction Data</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((item) => (
                <tr className="p-4" key={item.id}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.country}</td>
                  <td>{item.group?.name}</td>
                  <td>{item.creationDate}</td>
                  <td>{item.modificationDate}</td>
                  <td>
                    {loginData?.userGroup !== "SystemUser" ? (
                      <>
                        <i
                          onClick={() => handleShow(item)}
                          className="fa-solid fa-trash-can table-icon"></i>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-eye table-icon"></i>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
