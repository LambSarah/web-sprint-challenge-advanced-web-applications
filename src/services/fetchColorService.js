import React from 'react'
import { axiosWithAuth } from '../helpers/axiosWithAuth'

class fetchColorService extends React.Component {
	state = {
		colors: [],
		colorsLoading: false
	}

	async componentDidMount() {
		console.log('fetchColorService says =======LOADING COLORS======')
		//this.setState({
		//colorsLoading: true
		//})
		this.getData();
	}

	getData = () => {
		axiosWithAuth().get('http://localhost:5000/api/colors')
			.then(res => {
				console.log('fetchColorService says ========COLORS RETREIVED======', res)
				this.setState({
					colors: res.data,
					colorsLoading: false
				})
			})
			.catch(err => console.log(err))
	}

}

export default fetchColorService;