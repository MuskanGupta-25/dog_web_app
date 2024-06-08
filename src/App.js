import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './helper/helper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Skeleton, TextField, Typography } from '@mui/material';

function App() {
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState(''); // Default searchItem
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };

     getData();
    setLoading(false);

  }, [searchItem]);



  const handleOptionClick = (selectedOption) => {
    setSearchItem(selectedOption.name);
  };

  const options = data
    ? data.map((option) => {
      const firstLetter = option.name.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    })
    : [];

  const onCloseHandle = () => {
    setSearchItem('')
  }
  return (
    <div className="App" >
      {!loading && (
        <>
        <TableContainer component={Paper}>
        <header className="App-header">
          {data && (
            <Autocomplete
              id="grouped-demo"
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  handleOptionClick(newValue);
                }
              }}
              onInputChange={onCloseHandle}

            />
          )}
        </header>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Breed Group</TableCell>
              <TableCell align="center">Breed For</TableCell>
              <TableCell align="center">Height (in metrics) </TableCell>
              <TableCell align="center">Weight (in metric) </TableCell>
              <TableCell align="center">Life span</TableCell>
              <TableCell align="center">Origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchItem === '' && (
              <>
                {data &&
                  data.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <img src={row.image.url} style={{ width: '100px', height: '100px' }} alt={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.breed_group}</TableCell>
                      <TableCell align="center">{row.bred_for}</TableCell>
                      <TableCell align="center">{row.height.metric}</TableCell>
                      <TableCell align="center">{row.weight.metric}</TableCell>
                      <TableCell align="center">{row.life_span}</TableCell>
                      <TableCell align="center">{row.origin}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}

            {searchItem !== '' &&
              data &&
              data
                .filter((row) => row.name === searchItem)
                .map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <img src={row.image.url} style={{ width: '100px', height: '100px' }} alt={row.name} />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.breed_group}</TableCell>
                    <TableCell align="center">{row.bred_for}</TableCell>
                    <TableCell align="center">{row.height.metric}</TableCell>
                    <TableCell align="center">{row.weight.metric}</TableCell>
                    <TableCell align="center">{row.life_span}</TableCell>
                    <TableCell align="center">{row.origin}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
        </>
      )}

      {loading && (
        <>
        <Skeleton/>

        </>
      )}
      
    </div>
  );
}

export default App;
