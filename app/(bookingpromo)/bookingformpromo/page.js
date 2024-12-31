"use client";
import "../../../styles/bookingformpromo.css";
import React from "react";
import Header from "../../header"; 

const BookingForm = () => {
  return (
    <div>
      <Header />
      <div className="body">
        <div className="formContainer">
          <h1 className="formTitle">Booking Form</h1>
          <div className="formRow">
            <span className="label">Room</span>
            <span className="separator">:</span>
            <span className="value">Regular Room</span>
            <span className="extra">Rp. 20.000</span>
          </div>
          <div className="formRow">
            <span className="label">Date</span>
            <span className="separator">:</span>
            <span className="value">01/01/2024</span>
          </div>
          <div className="formRow">
            <span className="label">Time</span>
            <span className="separator">:</span>
            <span className="value">10:00-11:00</span>
          </div>
          <div className="formRow">
            <span className="label">Duration</span>
            <span className="separator">:</span>
            <span className="value">1 hour</span>
            <span className="extra">(x1)</span>
          </div>
          <div className="divider"></div>
          <div className="formRow">
            <span className="label">SUBTOTAL</span>
            <span className="separator">:</span>
            <span className="extra">Rp. 20.000</span>
          </div>
          <div className="formRow">
            <span className="label">Voucher</span>
            <span className="separator">:</span>
            <span className="extra">Rp. -2.000</span>
          </div>
          <div className="formRow">
            <span className="labeltot">TOTAL</span>
            <span className="separatortot">:</span>
            <span className="valuetot">Rp. 18.000</span>
          </div>
          <div className="buttonGroup">
            <button className="customButton">BACK</button>
            <button className="customButton">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
