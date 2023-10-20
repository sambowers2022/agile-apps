import React from "react";

const AppsTable = (data) => {
    return (
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
                <td>{e.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}

export default AppsTable;