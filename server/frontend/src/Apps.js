import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import App from './App' 
import AppView from './AppView' 
import { render } from 'react-dom';


export default function Apps(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState({})
  const [query, setQuery] = useState({ 'page': 1, 'order_by': '', 'name': '', 'desc': '', 'org': '', 'platform': '' });


  const fetchData = () => {
    fetch(`http://127.0.0.1:8000/api/apps/?page=${query.page}`, { method: "GET" })
      .then(response => response.json())
      .then(json => setData(json));
  };

  useEffect(() => {
    fetchData();
    setSelect({});
  }, []);


  const handlePageChange = (dir) => {
    setQuery({ ...query, page: query.page + dir });
    console.log(query);
    fetchData();
  };

  return (
    <>{
      JSON.stringify(select) === "{}" ? <div className="main">
        {data.map((e) => <App a={e} setSelect={setSelect} />)}
        <div className="pagination">
          <Button variant="secondary" onClick={() => handlePageChange(-1)}>Previous</Button>
          <Button variant="secondary" onClick={() => handlePageChange(1)}>Next</Button>
        </div></div> : <AppView select={select} setSelect={setSelect} user={props.user}/>
    }</>
  );

}

/* OLD RETURN
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