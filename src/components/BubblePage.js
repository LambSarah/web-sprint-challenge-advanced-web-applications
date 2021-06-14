import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

//import { editColorService, deleteColorService } from '../services/colorServices';
//import fetchColorService from '../services/fetchColorService';
//import axios from "axios";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = props => {
  const [colors, setColors] = useState([])
  const [editing, setEditing] = useState(false);

  const { push } = useHistory();

  useEffect(() => {
    console.log('BubblePage useEffects says ============getting colors=============')
    //const data = new fetchColorService()
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        console.log('BubblePage says ==========COLORS FETCHED=========', res.data)
        setColors(res.data)
      })
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    let id = editColor.id;
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${editColor}`, editColor)
      .then(res => {
        console.log(res)
        setColors(...colors,
          id, res.data)

      })
      .catch(err => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    let id = colorToDelete.id
    axiosWithAuth().delete(`http://localhost/5000/api/colors/${id}`)
      .then(res => {
        console.log(res)
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(resp => {
            setColors(resp.data)
            push('/protected')
          })
          .catch(err => console.log(err, 'error in get call'))
      })
      .catch(err => console.log(err, 'error in delete call'))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor} />
      <Bubbles colors={colors} />
    </div>
  )
}
export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
