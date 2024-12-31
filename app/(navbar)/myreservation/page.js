'use client';

import React, { useState, useEffect } from 'react';
import Header from "../../header.js";
import Footer from "../../footer.js";
import "../../../styles/myreservation.css";

const PaymentSuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#A98EB2] rounded-2xl p-6 w-[400px] h-[250px]  max-w-[90%] text-white text-center">
        <div className="flex justify-center mb-4">
          <div className="w-39 h-39 rounded-full border-2 border-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Payment Successfully!</h2>
        <button
          onClick={onClose}
          className="mt-4 underline text-sm"
        >
          Check your reservation
        </button>
      </div>
    </div>
  );
};

const ExtendModal = ({ reservation, onClose, onConfirm }) => {
  const [fromTime, setFromTime] = useState(reservation.time.split('-')[1]);
  const [untilTime, setUntilTime] = useState('');
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setShowSuccess(true);
      onConfirm(fromTime, untilTime);
    }
  };

  if (showSuccess) {
    return <PaymentSuccessModal onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90%] text-[#374151]">
        <h2 className="text-xl font-semibold mb-4">
          {step === 1 ? 'Extend Reservation Time' : 'Payment Confirmation'}
        </h2>

        {step === 1 ? (
          <div className="mb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full p-2 border rounded-[10px]"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Until</label>
              <input
                type="time"
                value={untilTime}
                onChange={(e) => setUntilTime(e.target.value)}
                className="w-full p-2 border rounded-[10px]"
                required
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p className="mb-4">Extension Details:</p>
            <p className="mb-2">Time: {fromTime} - {untilTime}</p>
            <p className="mb-4">Additional Payment Required: Rp 50.000</p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800">Please proceed with the payment to confirm your extension.</p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[20px] bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-[20px] text-white bg-pink-400"
          >
            {step === 1 ? 'Continue to Payment' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ReservationPage() {
    const [reservations, setReservations] = useState([
        {
            id: 'RNEYJINOV241',
            date: '01/11/2024',
            time: '10:00-11:00',
            room: 'Regular Room',
            payment: 'Success'
        }
    ]);
    const [extendedReservations, setExtendedReservations] = useState([]);
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleExtendClick = (reservation) => {
        setSelectedReservation(reservation);
        setShowExtendModal(true);
    };

    const handleExtendConfirm = (fromTime, untilTime) => {
        if (selectedReservation) {
            setReservations((prev) =>
                prev.map((reservation) =>
                    reservation.id === selectedReservation.id
                        ? {
                              ...reservation,
                              time: `${selectedReservation.time.split('-')[0]}-${untilTime}`,
                          }
                        : reservation
                )
            );
            setExtendedReservations((prev) => [...prev, selectedReservation.id]);
        }
    };

    if (reservations.length === 0) {
        return (
            <>
                <Header />
                <main className="main-card flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">No Reservations Found</h1>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="main-card">
                <div className="flex justify-center items-center mb-6">
                    <h1 className="card-title">YOUR RESERVATIONS</h1>
                </div>

                <div className="reservation-list">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="reservation-grid">
                            <div className="grid-item">
                                <span className="label">Reservation ID</span>
                                <span className="value">{reservation.id}</span>
                            </div>
                            <div className="grid-item">
                                <span className="label">Date</span>
                                <span className="value">{reservation.date}</span>
                            </div>
                            <div className="grid-item">
                                <span className="label">Time</span>
                                <span className="value">{reservation.time}</span>
                            </div>
                            <div className="grid-item">
                                <span className="label">Room</span>
                                <span className="value">{reservation.room}</span>
                            </div>
                            <div className="grid-item">
                                <span className="label">Payment</span>
                                <span className={`value ${reservation.payment === 'Success' ? 'success' : 'pending'}`}>
                                    {reservation.payment}
                                </span>
                            </div>
                            <div>
                                <button 
                                    className="Extends-btn"
                                    onClick={() => handleExtendClick(reservation)}
                                >
                                    Extends
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showExtendModal && selectedReservation && (
                    <ExtendModal
                        reservation={selectedReservation}
                        onClose={() => setShowExtendModal(false)}
                        onConfirm={handleExtendConfirm}
                    />
                )}
            </main>
            <Footer />
        </>
    );
}