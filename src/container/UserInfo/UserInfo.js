import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { reqURL, reqConfig } from "../../config/req";
import Loader from "../../components/UI/Loader/Loader";
import "./UserInfo.css";

function UserInfo(props) {
  const userId = props.match.params.id;
  const [user, setUser] = useState({});
  const url = reqURL.getAll + `/${userId}`;
  useEffect(() => {
    axios
      .get(url, reqConfig)
      .then(res => {
        setUser(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (JSON.stringify(user) == "{}") return <Loader />; // if user not fetched
  const {
    _links,
    first_name,
    last_name,
    phone,
    email,
    website,
    id,
    dob,
    gender,
    address
  } = user;
  return (
    <div className="UserInfo wrapper">
      <div className="user-details">
        <img src={_links.avatar.href} alt={first_name} />
        <div className="user-details_more">
          <h3>{`${first_name} ${last_name}`}</h3>
          <p>{dob}</p>
          <div className="">
            <div>
              <span className="user-details__head">Gender</span>
              <span>{gender}</span>
            </div>
            <div>
              <span className="user-details__head">Address</span>
              <span>{address}</span>
            </div>
            <div>
              <span className="user-details__head">Phone</span>
              <span>{phone}</span>
            </div>
            <div>
              <span className="user-details__head">Email</span>
              <span>{email}</span>
            </div>
            <div>
              <span className="user-details__head">Website</span>
              <span>{website}</span>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" >Back home</Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
