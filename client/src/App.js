import React, { useEffect } from 'react';
import {Table} from './features/table/Table';
import axios from 'axios';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {setSensorData, selectTable} from './features/table/tableSlice';
import {useSelector, useDispatch} from 'react-redux';


function App() {

  const storeData = useSelector(selectTable);
  const dispatch = useDispatch();

  const fetchData = async ()=>{
    try{
      const response = await axios.get('http://localhost:5000/listings');
      const SensorData = await response.data;
      dispatch(setSensorData(SensorData));
    }catch(e){
      console.log(e.stack);
    }
  }

  useEffect( ()=> {fetchData()},[]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Long',
        accessor: 'long',
      },
      {
        Header: 'Lat',
        accessor: 'lat',
      },
      {
        Header: 'Temperature',
        accessor: 'temperature',
      },
      {
        Header: 'Humidity',
        accessor: 'humidity',
      },
      {
        Header: 'pH',
        accessor: 'pH',
      },
      {
        Header: 'Pressure',
        accessor: 'pressure',
      },
      {
        Header: 'CO2',
        accessor: 'co2',
      }
    ],
    []
  )

  return (
    <>
      <h1 className="text-red-300 font-bold underline">
      Hello world!
    </h1>
    <div className="App">
      <header className="App-header">
        <Table columns={columns} data={storeData}/>
      </header>
    </div>
    </>

  );
}

export default App;
