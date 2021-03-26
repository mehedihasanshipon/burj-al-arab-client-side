import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Booking from '../Booking/Booking';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {bedType} = useParams();
     // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState({
        checkInDate : new Date(),
        checkOutDate : new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkInDate = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOutDate = date;
        setSelectedDate(newDate);
    };
    const handleBooking = ()=> {
        const info = {...loggedInUser,...selectedDate};
        fetch('http://localhost:3002/addbooking',{
            method:'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(info)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1> Hello {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
               
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Check In Date"
                value={selectedDate.checkInDate}
                onChange={handleCheckInDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Check out date"
                format="MM/dd/yyyy"
                value={selectedDate.checkOutDate}
                onChange={handleCheckOutDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </Grid>
            <Button onClick={handleBooking} variant="contained" color="primary">
                Book now
            </Button>
            </MuiPickersUtilsProvider>
            <Booking />
        </div>
    );
};

export default Book;