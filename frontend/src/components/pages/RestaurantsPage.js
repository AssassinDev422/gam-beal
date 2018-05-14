import React, { Component, PropTypes } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import { RestaurantTable } from '../partials/Tables';
import { getBusinesses } from '../../actions/businesses';
import * as restActions from '../../actions/businesses';
var _ = require("lodash");

class RestaurantsPage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            pageperrows: 10, //default Page per rows
        };
    }

    componentDidMount() {
        this.props.dispatch(getBusinesses(
            this.state.pageperrows, 
            this.props.businesses.currentPage * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    handlePageChange(selpageindex) {
        this.props.dispatch(getBusinesses(
            this.state.pageperrows, 
            (selpageindex - 1) * this.state.pageperrows, 
            this.state.searchTerm
        ));
    }

    ChangedPagePerRows(_evt, keyvalue) {
        if(this.state.pageperrows == keyvalue) return;
        
        this.setState({pageperrows: keyvalue});
        this.props.dispatch(getBusinesses(
            keyvalue, 
            0,
            this.state.searchTerm
        ));
    }

    render() {
        const { auth } = this.props;
        const userinfo = this.props.users.users[auth.user_id];
        const restaurants_data = _.toArray(this.props.businesses.businesses);
        const orderedRests = _.filter(restaurants_data, (o) => {return !!o.id;});
        const curpageindex = this.props.businesses.currentPage;
        const totalpagecount = this.props.businesses.pageCount;

        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const deleteChecked = () => {
            this.props.dispatch(restActions.clearChecked(_.toArray(this.props.businesses.selected_businesses)));
        }
        const checkBusiness = business => {
            this.props.dispatch(restActions.toggleChecked(business));
        }
        const onSearch = e =>{
            this.setState({searchTerm: e.target.value});
            this.props.dispatch(getBusinesses(
                this.state.pageperrows, 
                0, 
                e.target.value
            ));
        }
        const onSort = e =>{
            this.props.dispatch(restActions.sortBy(e));
            this.props.dispatch(getBusinesses(
                this.state.pageperrows, 
                0, 
                this.state.searchTerm
            ));
        }

        return (
            <div>
                <NavBar user={userinfo} active="restaurants"  logout={logout}/>
                <div className="content">
                    <div className="search-delete-bar">
                        <div className="search-bar">
                            <span className="glyphicon glyphicon-search icon"></span>
                            <input type="text" className="textinput" onChange={onSearch} placeholder="Search"/>
                        </div>
                        <button onClick={deleteChecked} className="delete-button" type="button">
                            <span className="glyphicon glyphicon-trash"></span> Delete
                        </button>
                        <Link to="/restaurants/create">
                            <button className="add-button" type="button">
                                <span className="glyphicon glyphicon-plus"></span> Add New Restaurant
                            </button>
                        </Link>
                    </div>
                    <div className="container-fluid">
                        <div className="row receipt-table">
                            <div className="title">
                                Restaurants:
                            </div>
                            <RestaurantTable onCheck={checkBusiness} onSort={onSort} restaurants={orderedRests}/>
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
        businesses: state.businesses
    };
}

export default connect(mapStateToProps)(RestaurantsPage);
