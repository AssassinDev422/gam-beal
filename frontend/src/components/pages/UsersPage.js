import React, { Component, PropTypes } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import * as actions from '../../actions/auth';
import * as userActions from '../../actions/users';
import {login} from '../../api/auth';
import {UserTable} from '../partials/Tables';
import {getUsers} from '../../actions/users';
var _ = require("lodash");

class UsersPage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            pageperrows: 10, //default Page per rows
        };
    }

    componentDidMount() {
        this.props.dispatch(getUsers(
            this.state.pageperrows, 
            this.props.users.currentPage * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    handlePageChange(selpageindex) {
        this.props.dispatch(getUsers(
            this.state.pageperrows, 
            (selpageindex - 1) * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    ChangedPagePerRows(_evt, keyvalue) {
        if(this.state.pageperrows == keyvalue) return;
        
        this.setState({pageperrows: keyvalue});
        this.props.dispatch(getUsers(
            keyvalue, 
            0,
            this.state.searchTerm
        ));
    }

    render() {
        const { auth } = this.props;
        const userinfo = this.props.users.users[auth.user_id];
        const users_data = _.toArray(this.props.users.all_users);
        const orderedUsers = _.filter(users_data, (o) => {return !!o.id;});
        const curpageindex = this.props.users.currentPage;
        const totalpagecount = this.props.users.pageCount;

        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const deleteChecked = () => {
            this.props.dispatch(userActions.clearChecked(_.toArray(this.props.users.selected_users)));
        }
        const checkUser = user => {
            this.props.dispatch(userActions.toggleChecked(user));
        }        
        const onSearch = e =>{
            this.setState({searchTerm: e.target.value});
            this.props.dispatch(getUsers(
                this.state.pageperrows, 
                0, 
                e.target.value
            ));
        }
        const onSort = e =>{
            this.props.dispatch(userActions.sortBy(e));
            this.props.dispatch(getUsers(
                this.state.pageperrows, 
                0, 
                this.state.searchTerm
            ));
        }

        return (
            <div>
                <NavBar user={userinfo} active="users"  logout={logout}/>
                <div className="content">
                    <div className="search-delete-bar">
                        <div className="search-bar">
                            <span className="glyphicon glyphicon-search icon"></span>
                            <input type="text" className="textinput" onChange={onSearch} placeholder="Search"/>
                        </div>
                        <button onClick={deleteChecked} className="delete-button" type="button">
                            <span className="glyphicon glyphicon-trash"></span> Delete
                        </button>
                    </div>        
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Users:
                            </div>
                            <UserTable onCheck={checkUser} onSort={onSort} users={orderedUsers}/>
                        </div>
                    </div>
                    <div className="div-separator"></div>
                    <div className="pagination">
                        <Pagination
                          activePage={curpageindex+1}
                          itemsCountPerPage={this.state.pageperrows}
                          totalItemsCount={totalpagecount * this.state.pageperrows}
                          pageRangeDisplayed={5}
                          onChange={::this.handlePageChange}
                        />
                    </div>
                    <div className="pagination">
                        <span>Rows per page &nbsp;</span>
                        <DropdownButton
                            bsStyle="default"
                            title={this.state.pageperrows}
                            id="dropdown-basic-page-rows"
                            onSelect={::this.ChangedPagePerRows}
                        >
                            <MenuItem eventKey="100" active={this.state.pageperrows == 100}>100</MenuItem>
                            <MenuItem eventKey="50" active={this.state.pageperrows == 50}>50</MenuItem>
                            <MenuItem eventKey="25" active={this.state.pageperrows == 25}>25</MenuItem>
                            <MenuItem eventKey="10" active={this.state.pageperrows == 10}>10</MenuItem>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
    general: state.general,
    offers:state.offers,
  };
}
export default connect(mapStateToProps
)(UsersPage);
