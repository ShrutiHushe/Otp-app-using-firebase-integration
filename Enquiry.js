import {useState, useRef} from "react";

function Enquiry()
{
	const[name, setName] = useState("");
	const[query, setQuery] = useState("");
	const[phone, setPhone] = useState("");
	const[otp, setOtp] = useState("");
	const[msg, setMsg] = useState("");

	const sendOtp = (event) => {
		event.preventDefault();
		let ans = name + " " + query + " " + phone;
		alert(ans);
	}

	const submitOtp = (event) => {
		event.preventDefault();
		let ans = otp;
		alert(ans);
	}

return(
<>
<center>
<h1> Fill the form </h1>
<form onSubmit = {sendOtp}>
<input type = "email" placeholder="enter your name " onChange={(event) => {setName(event.target.value);}} />
<br/><br/>
<textarea  placeholder="enter your query " rows={3} cols={20} onChange={(event) => {setQuery(event.target.value);}} ></textarea>
<br/><br/>
<input type = "number" placeholder="enter phone number " onChange={(event) => {setPhone(event.target.value);}}/>
<br/><br/>
<input type = "submit" value="Send OTP"/>
</form>

<form onSubmit = {submitOtp}>
<input type = "number" placeholder="enter otp " onChange={(event) => {setOtp(event.target.value);}} />
<br/><br/>
<input type = "submit" value="Submit OTP"/>
</form>

</center>
</>
);
}
export default Enquiry;