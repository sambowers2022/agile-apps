import React from "react";

const AppPreview = (props) => {
    console.log(props.name);
    return (
        <tr className="app">
            <td>{props.name}</td>
            <td>{props.desc}</td>
            <td>{props.org}</td>
            {/* TODO fix so that this supports multiple platforms/links */}
            <td><a href={props.links}>{props.platforms}</a></td>
            <td>{props.price}</td>
        </tr>
    );
}

export default AppPreview;