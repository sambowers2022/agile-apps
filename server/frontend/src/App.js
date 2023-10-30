import React, { useState, useEffect } from 'react';

import { render } from 'react-dom';


export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  const fetchData = (page) => {
    fetch(`http://127.0.0.1:8000/api/apps/?page=${page}`, { method: "GET" })
      .then(response => response.json())
      .then(json => setData(json));
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(currentPage)
  };

  var json = `{"name":"myApp","desc":"Basic app.","org":"Me","platforms":"IOS","links":"","price":9.99}`;
  const obj = JSON.parse(json);
  console.log(obj);
  return (
    <>
      <div className='main'>
          
        {<table className="apps">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Organization</th>
              <th>Platforms</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr className="appsRow">
                <td>{e.name}</td>
                <td>{e.desc}</td>
                <td>{e.org}</td>
                <td>{e.platforms.map(p =>
                  <a href={p.link} target="_blank">{p.name} </a>
                )}</td>
                <td>{e.price == 0 ? 'Free' : '$'  + e.price}</td>
              </tr>
            ))}
          </tbody>
        </table>}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}