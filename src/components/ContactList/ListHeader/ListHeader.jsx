import React from "react";
import "./ListHeader.css";
// get our fontawesome imports 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function ListHeader() {
  return (
    <tr>
      <th>Avatar</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Website</th>
      <th className="add-user_btn"><Link to="/users/new/"><FontAwesomeIcon icon={faUserPlus}/></Link></th>
    </tr>
  );
}
