import React, { Component, PropTypes } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {WithdrawTable} from '../partials/Tables';
import {getWithdrawals} from '../../actions/withdrawals';
import * as withActions from '../../actions/withdrawals';
var _ = require("lodash");

class WithdrawPage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            pageperrows: 10, //default Page per rows
        };
    }

    componentDidMount() {
        this.props.dispatch(getWithdrawals(
            this.state.pageperrows, 
            this.props.withdrawals.currentPage * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    handlePageChange(selpageindex) {
        this.props.dispatch(getWithdrawals(
            this.state.pageperrows, 
            (selpageindex - 1) * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    ChangedPagePerRows(_evt, keyvalue) {
        if(this.state.pageperrows == keyvalue) return;
        
        this.setState({pageperrows: keyvalue});
        this.props.dispatch(getWithdrawals(
            keyvalue, 
            0,
            this.state.searchTerm
        ));
    }

    render() {
        const { auth } = this.props;
        const userinfo = this.props.users.users[auth.user_id];
        const withdrawals_data = _.toArray(this.props.withdrawals.requests);
        const orderedWiths = _.filter(withdrawals_data, (o) => {return !!o.id;});
        const curpageindex = this.props.withdrawals.currentPage;
        const totalpagecount = this.props.withdrawals.pageCount;

        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const deleteChecked = () => {
            this.props.dispatch(withActions.clearChecked(_.toArray(this.props.withdrawals.selected_requests)));
        }
        const checkRec = withdrawal => {
            this.props.dispatch(withActions.toggleChecked(withdrawal));
        }
        const onSearch = e =>{
            this.setState({searchTerm: e.target.value});
            this.props.dispatch(getWithdrawals(
                this.state.pageperrows, 
                0, 
                e.target.value
            ));
        }
        const onSort = e =>{
            this.props.dispatch(withActions.sortBy(e));
            this.props.dispatch(getWithdrawals(
                this.state.pageperrows, 
                0, 
                this.state.searchTerm
            ));
        }

        return (
            <div>
                <NavBar user={userinfo} active="withdrawals"  logout={logout}/>
                <div className="content">
                    <div className="search-delete-bar">
                        <div className="search-bar">
                            <span className="glyphicon glyphicon-search icon"></span>
                            <input type="text" className="textinput" onChange={onSearch} placeholder="Search"/>
                        </div>
                    </div>        
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Receipt Requests:
                            </div>
                            <WithdrawTable onCheck={checkRec} onSort={onSort} requests={orderedWiths}/>
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
    withdrawals: state.withdrawals,
  };
}
export default connect(mapStateToProps
)(WithdrawPage);
