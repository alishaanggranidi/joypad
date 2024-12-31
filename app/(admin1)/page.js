
"use client";
import React, { useState } from "react";
import "../../../styles/admin1.css";

export default function admin1() {
    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
                window.location.href = '/login';
            } else {
                console.error('Logout gagal');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Daftar Reservasi</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header className="header">
                <div className="logo-img">
                    <img src="Journey 1.png" alt="Logo Journey" className={styles.logoImg} />
                </div>
                <nav>
                    <ul className="navList">
                        <li><a href="#" className="a">Home</a></li>
                        <li><a href="#" className="a">Review</a></li>
                        <li><a href="#" className="a">Admin</a></li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <div className="reservationContainer">
                    <div className="titleBar">
                        <h2>Daftar Reservasi</h2>
                        <button className="addButton">+ Tambah Reservasi</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Reservation ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Room</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>RNEYJ1NOV241</td>
                                <td>19/12/2024</td>
                                <td>10:00-11:00</td>
                                <td>Regular Room</td>
                                <td className="success">Success</td>
                                <td>
                                    <button className="deleteBtn">🗑️</button>
                                    <button className="extendBtn">Extends</button>
                                </td>
                            </tr>
                            <tr>
                                <td>JWEJHC4NJ56</td>
                                <td>22/12/2024</td>
                                <td>16:00-17:00</td>
                                <td>VIP Room</td>
                                <td className="success">Success</td>
                                <td>
                                    <button className="deleteBtn">🗑️</button>
                                    <button className="extendBtn">Extends</button>
                                </td>
                            </tr>
                            <tr>
                                <td>HJBCWH34BJF</td>
                                <td>21/12/2024</td>
                                <td>13:00-14:00</td>
                                <td>VVIP Room</td>
                                <td className="success">Success</td>
                                <td>
                                    <button className="deleteBtn">🗑️</button>
                                    <button className="extendBtn">Extends</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <footer className="footer">
                <div className="logoutContainer">
                    <button className="logoutBtn" onClick={logout}>
                        <span className="logoutIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
                            </svg>
                        </span>
                        Logout
                    </button>
                </div>
            </footer>
        </>
    );
}
