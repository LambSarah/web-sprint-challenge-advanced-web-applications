import axios from "axios";

//Task List:
//Build and export a function used to send in our authorization token
export const axiosWithAuth = () => {
	const token = localStorage.getItem('token')
	console.log('axiosWithAuth says ======TOKEN RETRIEVED FROM LOCALSTORAGE=======', token)
	return axios.create({
		headers: {
			authorization: token,
			applicationType: 'application/json'
		}
	})
}