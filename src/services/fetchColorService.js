import React from 'react'
import { axiosWithAuth } from '../helpers/axiosWithAuth'

class fetchColorService extends React.Component {
	state = {
		colorData: [],
		colorsLoading: false
	}

	componentDidMount() {
		this.setState({
			colorsLoading: true
		})
		this.getData();
	}

	getData = () => {
		axiosWithAuth().get('/colors')
			.then(res => {
				console.log(res)
				this.setState({
					colorsData: res.data,
					colorsLoading: false
				})
			})
			.catch(err => console.log(err))
	}

}

export default fetchColorService;