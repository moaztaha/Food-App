import React from 'react'
import noData from "../../../../assets/images/no-data.png";

export default function NoData() {
  return (
    <div className="d-flex align-items-center justify-content-center text-center">
      <div >
        <img className='w-30 mb-4' src={noData} alt="no-data" />
        <h3 className='fw-bold'> No Data !</h3>
        <p className="text-muted text-center">
          are you sure you want to delete this item ? if you are sure just <br/> click
          on delete it
        </p>
      </div>
    </div>
  );
}
