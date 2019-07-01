import React from "react";
import "./ContactList.css";
import ListHeader from "./ListHeader/ListHeader";
import ListRow from "./ListRow/ListRow";
import { connect } from "react-redux";
import Loader from "../UI/Loader/Loader";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { reqURL, reqConfig } from "../../config/req";
import { getAllData, updateUsersState } from "../../store/actions/actions";

class ContactList extends React.Component {
  //   componentDidMount() {
  //   this.props.deleteUser()
  // }
 
  openUserInfo = (e, id) => {  
    if (e.target.tagName === "path" || e.target.tagName === "svg") {
      return false;
    }
    this.props.history.push(`/users/${id}`);
  }

  editUser = (e, id) => {
    this.props.history.push(`/users/${id}/edit`);    
  }

  renderRows = () => {
    return this.props.state.users.map((user, index) => {
      return (
        <ListRow editUser={this.editUser} openUser={this.openUserInfo} key={user.id} {...user} deleteuser={this.props.deleteuser} />
      );
    });
  };
  render() {
    if (this.props.state.usersLoading) return <Loader />;
    return (
      <div className="ContactList">
        {/* <div className=""> */}

        <table cellSpacing="0">
          <tbody>
            <ListHeader />
            {this.renderRows()}
          </tbody>
        </table>

        {/* <div className="divTableBody">
          </div>
        </div> */}

        {/* <div className="blueTable outerTableFooter">
        <div className="tableFootStyle">
          <div className="links">
            <a href="#">&laquo;</a>{" "}
            <a className="active" href="#">
              1
            </a>{" "}
            <a href="#">2</a> <a href="#">3</a> <a href="#">4</a>{" "}
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateUsersState: users => dispatch(updateUsersState(users))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactList));
