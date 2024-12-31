"use client";

import React, { useState, useRef, useEffect } from "react";

import "../styles/header.css";
import Link from "next/link";


const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState("Guest");

  const toggleDropdown = () => {
    console.log("Dropdown toggled"); // Debugging
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const userData = await response.json();
            console.log("User data:", userData);
            setUsername(userData.username);
          } else {
            console.error("Failed to fetch user profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
  
    fetchUserProfile();
  }, []);
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    window.location.href = "/";
  };
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img src="/image/Journey 1.png" alt="Logo Website" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="/customer/homepage" id="home" className="nav-link active">
                Home
              </a>
            </li>
            <li>
              <a href="/my-reservation" id="myReservation" className="nav-link">
                My Reservation
              </a>
            </li>
            <li>
              <Link href="/review" id="review" className="nav-link">
                Review
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav>
        <ul>
          <div className="profile-container">
            <div className="profile">
              <img
                className="profile-circle"
                src="/image/user.png"
                alt="Profile Picture"
              />
            </div>
          </div>
          <div className="user-profile">
            <li>
              <a className="username" id="username" onClick={toggleDropdown}>
              {username}
              </a>
              <div
                className={`dropdown-content ${
                  dropdownVisible ? "visible" : ""
                }`}
              >
                <a href="/notification">Notification</a>
                <a href="/" onClick={handleLogout}>Log Out</a>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
