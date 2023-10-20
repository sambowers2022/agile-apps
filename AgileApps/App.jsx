import React, { useState } from 'react';
import Navbar from './components/index';
import './style.css'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions
} from 'react-native';
import { render } from 'react-dom';

export default function App() {
  const [data, setData] = useState([]);

  function handleClick() {
    fetch('http://127.0.0.1:8000/api/?format=json', { method: "GET" })
      .then(response => response.json())
      .then(json => setData(json));
  }
  var json = `{"name":"myApp","desc":"Basic app.","org":"Me","platforms":"IOS","links":"","price":9.99}`;
  const obj = JSON.parse(json);
  console.log(obj);

  return (
    <div>
      <Navbar />
      <div className='main'>
        <button onClick={handleClick}>Get Data</button>
        <table className="apps">
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
              <tr class="appsRow">
                <td>{e.name}</td>
                <td>{e.desc}</td>
                <td>{e.org}</td>
                {e.platforms.map(p =>
                  <a href={p.link} target="_blank">{p.name} </a>
                )}
                <td>{e.price == 0 ? 'Free' : '$'  + e.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}