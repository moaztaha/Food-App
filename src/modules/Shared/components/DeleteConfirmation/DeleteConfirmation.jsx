import React from 'react'
import noDataImg from "../../../../assets/images/no-data.png";

export default function DeleteConfirmation({deleteItem,itemName}) {
  return (
    <>
      <img src={noDataImg} alt="no-data" className="w-30 mb-3" />
      <h3 className="mb-3">Delete This {deleteItem} ?</h3>
      <p className="text-muted">
        are you sure you want to delete
        <span className="text-success fw-bold "> {itemName} </span> ? if you are
        sure just click on delete it
      </p>
    </>
  );
}
