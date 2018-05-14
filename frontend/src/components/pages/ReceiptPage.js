import React, { Component, PropTypes } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {ReceiptTable} from '../partials/Tables';
import {getReceipts} from '../../actions/receipts';
import * as recActions from '../../actions/receipts';
var _ = require("lodash");

class ReceiptPage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            pageperrows: 10, //default Page per rows
        };
    }

    componentDidMount() {
        this.props.dispatch(getReceipts(
            this.state.pageperrows, 
            this.props.receipts.currentPage * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    handlePageChange(selpageindex) {
        this.props.dispatch(getReceipts(
            this.state.pageperrows, 
            (selpageindex - 1) * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    ChangedPagePerRows(_evt, keyvalue) {
        if(this.state.pageperrows == keyvalue) return;
        
        this.setState({pageperrows: keyvalue});
        this.props.dispatch(getReceipts(
            keyvalue, 
            0,
            this.state.searchTerm
        ));
    }
    render() {
        const { auth } = this.props;
        const userinfo = this.props.users.users[auth.user_id];
        const receipts = _.toArray(this.props.receipts.receipts);
        const orderedRecs = _.filter(receipts, (o) => {return !!o.id;});
        const curpageindex = this.props.receipts.currentPage;
        const totalpagecount = this.props.receipts.pageCount;
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const deleteChecked = () => {
            this.props.dispatch(recActions.clearChecked(_.toArray(this.props.receipts.selected_receipts)));
        }
        const checkRec = receipt => {
            this.props.dispatch(recActions.toggleChecked(receipt));
        }
        const onSearch = e =>{
            this.setState({searchTerm: e.target.value});
            this.props.dispatch(getReceipts(
                this.state.pageperrows, 
                0, 
                e.target.value
            ));
        }
        const onSort = e =>{
            this.props.dispatch(recActions.sortBy(e));
            this.props.dispatch(getReceipts(
                this.state.pageperrows, 
                0, 
                this.state.searchTerm
            ));
        }
        return (
            <div>
                <NavBar user={userinfo} active="receipts"  logout={logout}/>
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
                            <ReceiptTable onCheck={checkRec} onSort={onSort} receipts={orderedRecs}/>
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
    receipts: state.receipts,
  };
}
export default connect(mapStateToProps
)(ReceiptPage);
