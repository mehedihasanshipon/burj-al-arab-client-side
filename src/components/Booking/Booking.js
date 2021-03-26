import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [bookings,setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:3002/bookingdata?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data => setBookings(data));
    },[])
    return (
        <div>
            <h3>You have {bookings.length} booking </h3>
            {
               bookings.map(book=> <li>{book.name} booked from {(new Date(book.checkInDate).toDateString('dd/mm/yyyy'))} to {(new Date(book.checkOutDate).toDateString('dd/mm/yyyy'))} </li>) 
            }
        </div>
    );
};

export default Booking;