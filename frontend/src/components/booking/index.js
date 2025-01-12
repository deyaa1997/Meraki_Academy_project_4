import React ,{useState } from "react"
import { Route , Link } from 'react-router-dom';
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import moment from 'moment'
import { useHistory } from "react-router-dom";
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Booking = ({token}) => {
  console.log(token);
  // console.log(name);
const [date, setDate] = useState(new Date())
const [date1 , setDate1] = useState(new Date())
 const [name, setName] = useState("")
 const [name1 , setName1] =useState("")
  const [vaccineName, setVaccineName] = useState("")
  const history=useHistory()
  const secret = process.env.SECRET;
  jwt.verify(token, "deyaa",(err, result) => {
    if (err) {
      const err = new Error("The token is invalid or expired");
      err.status = 403;
      console.log(err);
    }if (result){
      axios.post("http://localhost:5000/info", {_id :result.userId}).then((resu)=>{
        setName(resu.data.name)
        setName1(resu.data._id)
      }).catch((err)=>{
        console.log(err)
      })
    }
  })

  const [time, setTime] = useState('10:00');



    let mDate = moment(date1);
    let x = mDate.format("YYYY-MM-DD");
  //const time1 = '03:20'
    const dateTime = moment(x +" " + time, 'YYYY-MM-DDLT');
    //console.log(dateTime)
  //format you wanted
  const formatedDateTime = dateTime.format(`YYYY-MM-DDTHH:mm:ss.sssZ`)

  console.log(date1)
const booking1=(e)=>{
  e.preventDefault()
  setDate1(formatedDateTime)
  console.log(date1)
  axios
    .post("http://localhost:5000/booking", {
     
      name : name1,
      vaccineName,
      date:date1,
    }).then((result)=>{

        console.log(result.data);
        history.push("/home")
    }).catch((err)=>{
        console.log(err);
    })
}

  return (<>
      <div style={{ margin: "auto", display: "block", marginLeft: "170px" , marginTop: "30px" }}>
      <div className="name">
          <p>
            Name:   {name}
            </p>
        </div> 

        <div>
        
        <label htmlFor="vaccineName"  >Choose vaccine Name:</label>
        <select id="vaccineName" name="vaccineName" onChange={(e)=>{setVaccineName(e.target.value );}}>

      <option value="select" selected>-- select --</option>
      <option value="Oxford">Oxford/AstraZeneca</option>
      <option value="Pfizer">Pfizer</option>
      <option value="Sinopharm">Sinopharm </option>
      
    </select>
          </div>
          <br/>

          <div>
        <Calendar
          
          onChange={setDate1}
          value={date}
        />
      </div>
      {console.log(date)}


    <div style={{ display:"flex" , gap:"72px" , marginTop:"10px"}}>
      <button onClick={()=>{setTime("8:00")}}>8:00 AM</button>
      <button onClick={()=>{setTime("10:00")}}>10:00 AM</button>
      <button onClick={()=>{setTime("13:00")}}>1:00 PM</button>
  
    </div>
    {console.log(formatedDateTime)}


<button style={{ margin: "auto", width:"70px", display: "block", marginLeft: "135px" , marginTop: "10px" }} onClick={booking1}>booking</button>

      </div>
      </>
  )
}

    export default Booking