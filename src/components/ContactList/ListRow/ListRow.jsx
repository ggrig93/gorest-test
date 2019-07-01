import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ListRow.css";

export default function ListRow(props) {
  const { _links, first_name, last_name, phone, email, website, id } = props;
  const name = `${first_name} ${last_name}`;
  const imageHref = _links.avatar.href;
  const findUrl = /^(?:http:\/\/|www\.|https:\/\/)([^\/]+)/;
  const getUrl = website && website.match(findUrl)[1];
  return (
    <tr onClick={e => props.openUser(e, id)}>
      <td>
        <img className="list-avatar" src={imageHref} alt={name} />
      </td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>
        <a href={website}>{getUrl}</a>
      </td>
      <td>
        <FontAwesomeIcon
          icon={faUserEdit}
          style={{ cursor: "pointer", marginRight: "5px" }}
          title="Edit user"
          onClick={e => {props.editUser(e, id)}}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{ color: "red", cursor: "pointer" }}
          title="delete user"
          onClick={e => {
            let ask = window.confirm("Are you sure to delete?");
            ask && props.deleteuser(e, id);
          }}
        />
      </td>
    </tr>
  );
}
