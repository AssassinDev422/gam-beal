import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var _ = require('lodash');


export class TableRow extends Component {

    render() {
        const elements = this.props.items;
        const sortKeys = this.props.sortKeys;
        const onSort = this.props.onSort;
        const isHead = this.props.isHead;
        return (
            <tr>

            {_.map(elements, (element, i) =>{
                    if(isHead===true){
                        return (
                            <th key={i.toString()} onClick={()=>onSort(sortKeys[i])}>
                                {element}
                            </th>);
                    }
                    else{
                        return (
                            <td key={i.toString()}>
                                {element}
                            </td>);
                    }
                })}

            </tr>
            
        );
    }
}

export class UserTableRow extends Component {

    render() {
        const user = this.props.user;
        const onCheck = () => this.props.onCheck(user);
        const linksTo = "/users/"+user.id;

        const fieldOrder = [<input onChange={onCheck} type="checkbox"/>, 'id', 
                'email', 'last_name', 'first_name', 
                'offers_redeemed', 'lifetime_earnings', 
                'date_joined', <Link to={linksTo}><button type="button">View User</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in user)
                        {
                            return (
                                    user[element]
                                    );
                        }
                    else
                        return (
                                element
                                );    
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class UserTable extends Component {

    render() {
        const users = this.props.users;
        const onCheck = this.props.onCheck;
        const header = ['', 'User ID', 'User Email', 
                'Last Name', 'First Name', 
                'Offers Redeemed', 'Lifetime Earnings', 
                'Date Joined', ''];
        const sortKeys = ['', 'id', 
                'email', 'last_name', 'first_name', 
                'offers_redeemed', 'lifetime_earnings', 
                'date_joined', ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(users, (user, i) =>{
                            return(<UserTableRow onCheck={onCheck} user={user} key={i.toString()}/>);
                        })}
                </tbody>
            </table>
            );
    }
}

export class RetaurantTableRow extends Component {

    render() {
        const restaurant = this.props.restaurant;
        const logo_img = restaurant.logo_img;
        const featured_img = restaurant.featured_img;
        const linksTo = "/restaurants/"+restaurant.id;
        const onCheck = () => this.props.onCheck(restaurant);
        const fieldOrder = [<input onChange={onCheck} type="checkbox"/>, 'business_name', 
                <img src={logo_img}/>, <img src={featured_img}/>, 'receipt_rules', 
                <Link to={linksTo}><button type="button" className="active-button">Edit</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in restaurant)
                        {
                            return (
                                    restaurant[element]
                                    );
                        }
                    else
                        return (
                                element
                                );    
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class RestaurantTable extends Component {

    render() {
        const restaurants = this.props.restaurants;
        const onCheck = this.props.onCheck;
        const header = ['', 'Restaurant Name', 'Logo Icon', 
                'Featured Image', 'Receipt Rules', ''];
        const sortKeys = ['', 'business_name', 
                'logo_img', 'featured_img', 'receipt_rules', 
                ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(restaurants, (restaurant, i) =>{
                            return(<RetaurantTableRow key={i.toString()}
                             onCheck={onCheck} restaurant={restaurant}/>);
                        })}
                </tbody>
            </table>
            );
    }
}

export class OffersTableRow extends Component {

    render() {
        const offer = this.props.offer;
        const business_name = offer.business.business_name;
        const reward_vals = offer.offer_type==="fixed" ? '$' + offer.min_reward : '$' + offer.min_reward + '-$' + offer.max_reward;
        const onCheck = () => this.props.onCheck(offer);
        const onFeatured = () => this.props.onFeaturedCheck(offer);
        const linksTo = "/offers/"+offer.id;
        const type = offer.surge ? "Surge" : offer.offer_type.charAt(0).toUpperCase() + offer.offer_type.slice(1);
        const status = offer.status.charAt(0).toUpperCase() + offer.status.slice(1);
        const statusHtml = (<div className="svgdiv">
            <svg>
                <circle cx={10} cy={10} r={7} fill={status==="Active" ? "#94DD96" : "#E3E3E4"} />
            </svg><div className="text">{status}</div></div>
            );
        const fieldOrder = [<input onChange={onCheck}  type="checkbox"/>, business_name,<input onChange={onFeatured} checked={offer.featured} type="checkbox"/>, 
                type, reward_vals,'redeemable_quantity', statusHtml, 'display_order', 
                <Link to={linksTo}><button type="button" className="active-button">Edit</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in offer)
                        {   
                            var elem = offer[element];
                            if(typeof elem === 'string'){
                                elem = elem.charAt(0).toUpperCase() + elem.slice(1);
                            }
                            return (
                                    elem
                                    );
                        }
                    else{
                        if (element===reward_vals)
                            return (
                                <div className="green">{element}</div>
                                );
                        else
                            return (
                                    element
                                    );    
                    }
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class OffersTable extends Component {

    render() {
        const offers = this.props.offers;
        const onCheck = this.props.onCheck;
        const header = ['', 'Business Name','Featured', 'Reward Type', 'Reward Values',
                'Redeemable Qty.', 'Status', 'Display Order', ''];
        const sortKeys = ['', 'business__business_name','featured', 
                'offer_type', 'min_reward','redeemable_quantity', 'status', 'display_order', 
                ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(offers, (offer, i) =>{
                            return(<OffersTableRow key={i.toString()}
                             onCheck={onCheck} onFeaturedCheck={this.props.onFeaturedCheck} offer={offer}/>);
                        })}
                </tbody>
            </table>
            );
    }
}

export class ReceiptTableRow extends Component {

    render() {
        const receipt = this.props.receipt;
        const user = this.props.user ? this.props.user : receipt.user;
        const email = user.email;
        const temp_array = receipt.receipt_img.split("/");
        const img_name = temp_array[temp_array.length-1];
        const receipt_line = (<div className="recimgdiv">
            <img className="receipt_img" src={receipt.receipt_img}/>
            <div className="text">{img_name}</div>
            </div>);
        const reward_vals = '$' + receipt.money_earned;
        const onCheck = () => this.props.onCheck(receipt);
        const linksTo = "/receipts/"+receipt.id;
        const status = receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1);;
        const status_color = () =>{
            if(status==="Open")
                return "#94DD96";
            else if(status==="Approved")
                return "#E3E3E4";
            else
                return "#F89B9B";
        }
        const statusHtml = (<div className="svgdiv">
            <svg>
                <circle cx={10} cy={10} r={7} fill={status_color()} />
            </svg><div className="text">{status}</div></div>
            );
        const fieldOrder = ['id', 
                email, receipt_line, reward_vals , statusHtml, 'submit_time', 
                <Link to={linksTo}><button type="button">View Receipt</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in receipt)
                        {   
                            var elem = receipt[element];
                            if(typeof elem === 'string'){
                                elem = elem.charAt(0).toUpperCase() + elem.slice(1);
                            }
                            return (
                                    elem
                                    );
                        }
                    else{
                        return (
                                element
                                );    
                    }
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class ReceiptTable extends Component {

    render() {
        const receipts = this.props.receipts;
        const onCheck = this.props.onCheck;
        const header = ['Transaction ID', 'User Email', 'Receipt Image',
                'Reward Value', 'Status', 'Submit Time', ''];
        const sortKeys = ['id', 
                'user__email', 'receipt_img', 'money_earned' , 'status', 'submit_time', 
                ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(receipts, (receipt, i) =>{
                            return(<ReceiptTableRow key={i.toString()}
                             onCheck={onCheck} receipt={receipt} user={this.props.user}/>);
                        })}
                </tbody>
            </table>
            );
    }
}

export class RatingTableRow extends Component {

    render() {
        const rating = this.props.rating;
        const email = rating.user.email;
        const business = rating.business.business_name;
        const reward_val = '$' + rating.receipt.offer.min_reward;
        const review_question = rating.would_return;
        const stars_number = Math.round(rating.rating);
        const starColors = [];
        const transactionDT = rating.receipt.submit_time;
        for(let i = 0; i<5; i++){
            if(i<stars_number)
                starColors.push("#8DC88E");
            else
                starColors.push("#D5D5D5");
        }
        const createStar = color=>{
            const style = {background: color};
            return (
                    <div className="star" style={style}></div>
            );
        }
        const stars_list = _.map(starColors, color=>{
            const star =  createStar(color);
            return (
                <td>{star}</td>
                );
            });
        const stars = <div className="starsTable"><table><tbody><tr>{stars_list}</tr></tbody></table></div>;
        const onCheck = () => this.props.onCheck(receipt);
        const linksTo = "/receipts/"+rating.receipt.id;

        const fieldOrder = [<input onChange={onCheck} type="checkbox"/>, 'receipt_id',
                email, business, stars, reward_val , review_question, transactionDT, 
                <Link to={linksTo}><button type="button">View Receipt</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in rating)
                        {   
                            var elem = rating[element];
                            if(typeof elem === 'string'){
                                elem = elem.charAt(0).toUpperCase() + elem.slice(1);
                            }
                            return (
                                    elem
                                    );
                        }
                    else{
                        return (
                                element
                                );    
                    }
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class RatingTable extends Component {

    render() {
        const ratings = this.props.ratings;
        const onCheck = this.props.onCheck;
        const header = ['','Transaction Number', 'User Email', 'Business Name',
                'Star Rating', 'Reward Value', 'Review Question', 'Date/Time', ''];
        const sortKeys = ['', 'receipt_id',
                'user__email', 'business__business_name', 'rating', 'receipt__offer__min_reward' , '', 'receipt__submit_time', 
                ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(ratings, (rating, i) =>{
                            return(
                                <RatingTableRow onCheck={onCheck} key={i.toString()} rating={rating}/>
                             );
                        })}
                </tbody>
            </table>
            );
    }
}

export class WithdrawTableRow extends Component {

    render() {
        const request = this.props.request;
        const user = this.props.user ? this.props.user : request.user;
        const email = user.email;
        const paypal = user.paypal;
        const onCheck = () => this.props.onCheck(request);
        const linksTo = "/withdrawals/"+request.id;
        const status = request.status.charAt(0).toUpperCase() + request.status.slice(1);;
        const status_color = () =>{
            if(status==="Open")
                return "#94DD96";
            else if(status==="Accepted")
                return "#E3E3E4";
            else
                return "#F89B9B";
        }
        const statusHtml = (<div className="svgdiv">
            <svg>
                <circle cx={10} cy={10} r={7} fill={status_color()} />
            </svg><div className="text">{status}</div></div>
            );
        const amount = '$' + request.amount;
        const fieldOrder = ['id', 
                email, paypal, amount , statusHtml, 'date', 
                <Link to={linksTo}><button type="button">View Request</button></Link>];
        const fields = _.map(fieldOrder, (element, i) =>{
                    if(element in request)
                        {   
                            var elem = request[element];
                            if(typeof elem === 'string'){
                                elem = elem.charAt(0).toUpperCase() + elem.slice(1);
                            }
                            return (
                                    elem
                                    );
                        }
                    else{
                        return (
                                element
                                );    
                    }
                });
        return(<TableRow items={fields} isHead={false}/>);
    }
}

export class WithdrawTable extends Component {

    render() {
        const requests = this.props.requests;
        const onCheck = this.props.onCheck;
        const header = ['Transaction ID', 'User Email', 'User PayPal',
                'Withdrawal Amount', 'Status', 'Date', ''];
        const sortKeys = ['id', 
                'user__email', 'user__paypal', 'amount' , 'status', 'date',
                ''];
        return(
            <table>
                <thead>
                    <TableRow items={header} onSort={this.props.onSort} sortKeys={sortKeys} isHead={true}/>
                </thead>
                <tbody>
                    {_.map(requests, (request, i) =>{
                            return(<WithdrawTableRow key={i.toString()}
                             onCheck={onCheck} request={request} user={this.props.user}/>);
                        })}
                </tbody>
            </table>
            );
    }
}