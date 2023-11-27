import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import App from './App'
import AppView from './AppView'
import Filter from './Filter'
import { render } from 'react-dom';


export default function Apps(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState({})
  const [query, setQuery] = useState({ 'page': 1, 'order_by': 'id', 'filter': '', 'val': '', 'desc': false});


  const fetchData = () => {
     
    fetch(`/api/apps/?page=${query.page}&order_by=${query.order_by}&filter=${query.filter}&val=${query.val}&${query.desc ? 'desc':''}`, { method: "GET" })
      .then(response => response.json())
      .then(json => setData(json));
  };

  useEffect(() => {
    fetchData();
    setSelect({});
  }, []);


  const handlePageChange = (dir) => {
    setQuery({ ...query, page: query.page + dir });
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>{JSON.stringify(select) === "{}" ?
      <div className="main">
        {/* Sort/Filter Bar */}
        <Filter query={query} setQuery={setQuery} fetch={fetchData} />
        {data.map((e) => <App a={e} setSelect={setSelect} />)}
        <div className="pagination">
          <Button variant="secondary" onClick={() => handlePageChange(-1)}>Previous</Button>
          <Button variant="light" disabled>Page {query.page}</Button>
          <Button variant="secondary" onClick={() => handlePageChange(1)}>Next</Button>
        </div>
      </div>
      : <AppView select={select} setSelect={setSelect} user={props.user} />
    }</>
  );

}

/* OLD APPS TABLE
<>
       (<div className='main'>

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
              <tr className="appsRow" id={e.id}>
                <td><a onClick={()=>setSelect(e)} href="#">{e.name}</a></td>
                <td>{e.desc}</td>
                <td>{e.org}</td>
                <td>{e.platforms.map(p =>
                  <a href={p.link} target="_blank">{p.name} </a>
                )}</td>
                <td>{e.price == 0 ? 'Free' : '$' + e.price}</td>
              </tr>
            ))}
          </tbody>
        </table>}
        <div className="pagination">
          <button className="btn btn-primary" onClick={() => handlePageChange(-1)}>Previous</button>
          <button className="btn btn-primary" onClick={() => handlePageChange(1)}>Next</button>
        </div>
      </div>) : <App select={select} setSelect={setSelect}/>}
    </> 
    */