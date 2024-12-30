'use client';
import React, { useState } from 'react';
import "../../../styles/home_admin.css";
import Header_admin from '@/app/header_admin';

const PaymentSuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90%] text-[#374151]">
        <h2 className="text-xl font-semibold mb-4">Payment Successful!</h2>
        <p className="mb-4">Your reservation has been extended successfully.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[20px] text-white bg-mauve-400"
          >
            Close
          </button>
        </div>
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
              <label className="block text-sm font-medium text-mauve-700 mb-1">From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full p-2 border rounded-[10px]"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-mauve-700 mb-1">Until</label>
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
            className="px-4 py-2 rounded-[20px] bg-mauve-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={step === 1 && !untilTime}
            className="px-4 py-2 rounded-[20px] text-white bg-mauve-400 disabled:bg-mauve-200"
          >
            {step === 1 ? 'Continue to Payment' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90%] text-mauve">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Are you sure you want to delete this?
        </h2>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-[20px] bg-mauve-200"
          >
            No
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 rounded-[20px] text-white bg-mauve-400"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservationList = () => {
  const [reservations, setReservations] = useState([
    {
      id: 'RNEYJ1NOV241',
      date: '19/12/2024',
      time: '10:00-11:00',
      room: 'Regular Room',
      payment: 'Success'
    },
    {
      id: 'JWEJHC4NJ56',
      date: '22/12/2024',
      time: '16:00-17:00',
      room: 'VIP Room',
      payment: 'Success'
    },
    {
      id: 'HJBCWH34BJF',
      date: '21/12/2024',
      time: '13:00-14:00',
      room: 'VVIP Room',
      payment: 'Success'
    },
    {
      id: 'AHSBDA278F4',
      date: '23/12/2024',
      time: '22:00-23:00',
      room: 'VIP Room',
      payment: 'Success'
    },
    {
      id: 'KJSG67SHEGS',
      date: '30/12/2024',
      time: '12:00-15:00',
      room: 'Regular Room',
      payment: 'Success'
    },
    {
      id: 'UDH6FBETCU8',
      date: '31/12/2024',
      time: '12:00-15:00',
      room: 'VVIP Room',
      payment: 'Success'
    },
    {
      id: 'IJFHT623HDT',
      date: '20/12/2024',
      time: '12:00-15:00',
      room: 'Regular Room',
      payment: 'Success'
    }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setReservationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reservationToDelete) {
      setReservations(reservations.filter(reservation => reservation.id !== reservationToDelete));
      setIsDeleteModalOpen(false);
      setReservationToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setReservationToDelete(null);
  };

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
                time: `${reservation.time.split('-')[0]}-${untilTime}`,
              }
            : reservation
        )
      );
      setTimeout(() => {
        setShowExtendModal(false);
        setSelectedReservation(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header_admin />
      </div>
      <div className="flex justify-center pt-20">
        <main className="w-full max-w-7xl px-4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Daftar Reservasi</h2>
            <button className="px-4 py-2 rounded-[20px] text-white " href="/add_admin">
              <a href="/admin/add_admin">+ Tambah Reservasi</a>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr >
                  <th className="p-4 text-left">Reservation ID</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Room</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} >
                    <td className="p-4">{reservation.id}</td>
                    <td className="p-4">{reservation.date}</td>
                    <td className="p-4">{reservation.time}</td>
                    <td className="p-4">{reservation.room}</td>
                    <td className="p-4">{reservation.payment}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleDeleteClick(reservation.id)}
                        className="mr-2 p-2 hover:bg-mauve-100 rounded-full"
                      >
                        🗑️
                      </button>
                      <button 
                        onClick={() => handleExtendClick(reservation)}
                        className="px-4 py-2 rounded-[20px] text-white "
                      >
                        Extend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {showExtendModal && selectedReservation && (
        <ExtendModal
          reservation={selectedReservation}
          onClose={() => setShowExtendModal(false)}
          onConfirm={handleExtendConfirm}
        />
      )}
    </div>
  );
};

export default ReservationList;