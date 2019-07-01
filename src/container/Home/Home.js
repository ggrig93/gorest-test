import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { reqURL, reqConfig } from "../../config/req";
import { getAllData, updateUsersState } from "../../store/actions/actions";
import ContactList from "../../components/ContactList/ContactList";
import ReactPaginate from "react-paginate";
import "./Home.css";

class Home extends Component {
  deleteUserHandler = async (e, id) => {
    e.preventDefault();
    const page = this.props.match.params.page;

    const url = reqURL.getAll + `/${id}`;
    const response = await axios.delete(url, reqConfig);
    if (response.status === 200) {
      const index = this.props.state.users.findIndex(item => {
        return item.id === id;
      });

      this.props.state.users.splice(index, 1);
      this.props.onUpdateUsersState(this.props.state.users);
      
      this.getAllUsersHandler(page);
      // this.props.history.push(`/`);
    }
  };

  getAllUsersHandler = async page => {
    const getPage = page ? "?page=" + page : "";
    const url = reqURL.getAll + getPage;
    const response = await axios.get(url, reqConfig); // fetching from api
    const data = {
      users: response.data.result,
      meta: response.data._meta,
      usersLoading: false
    };
    // TODO : _meta in local state for pagination

    this.props.getAllData(data);
  };

  componentDidMount() {
    // this.getAllUsersHandler();
    const page = this.props.match.params.page;
    // // if () {
    this.getAllUsersHandler(page);

    // }
  }

  componentWillReceiveProps(nextProps) {
    const page = nextProps.match.params.page;

    if (page !== this.props.match.params.page) {
      this.getAllUsersHandler(page);
    }
  }

  handlePageClick = ({ selected }) => {
    this.props.history.push(`/page/${selected + 1}`);
  };

  render() {
    return (
      <div className="Home wrapper">
        <ContactList deleteuser={this.deleteUserHandler} />
        <div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.state.meta.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page"}
            pageLinkClassName={"page-link"}
            // subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousClassName={"prev-btn"}
            nextClassName={"next-btn"}
          />
        </div>
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
    getAllData: data => dispatch(getAllData(data)),
    onUpdateUsersState: users => dispatch(updateUsersState(users))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
