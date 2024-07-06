import { useNavigate } from "react-router-dom"
import { TextField, Button } from "@mui/material"
import { useState } from "react";
import './FirstPage.css'

const FirstPage: React.FC =  () => {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');

  const handlesubmit = (e : React.FormEvent) => {
    e.preventDefault();
    if(!name || !phone || !email){
      alert('You have to fill all fields first');
      return;
    }

    const details = {name,phone,email};
    localStorage.setItem('details',JSON.stringify(details));
    navigate('/data');
  }

  return (
    <>
    <form className="form-element" onSubmit={handlesubmit}>
      <TextField 
      label="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      >
      </TextField>
      <TextField 
      label="Phone"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      >
      </TextField>
      <TextField 
      label="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      >
      </TextField>
      <Button type="submit" variant="contained"> Submit </Button>
    </form>
    </>
  )
}
export default FirstPage