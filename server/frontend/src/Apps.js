import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import App from './App'
import AppView from './AppView'
import Filter from './Filter'
import { render } from 'react-dom';

// Main view showing all of the apps: takes in user object.
export default function Apps(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState({})
  const [query, setQuery] = useState({ 'page': 1, 'order_by': 'id', 'filter': '', 'val': '', 'desc': false });

  // Method to retreive apps from api.
  const fetchData = () => {

    fetch(`/api/apps/?page=${query.page}&order_by=${query.order_by}&filter=${query.filter}&val=${query.val}&${query.desc ? 'desc' : ''}`, { method: "GET" })
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
