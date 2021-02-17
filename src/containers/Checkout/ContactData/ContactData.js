import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postcode: ""
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Test Name",
        address: {
          street: "Test Address",
          postcode: "123456",
          country: "UK"
        },
        email: "test@mydomain.com"
      },
      deliveryMethod: "quick"
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form action=''>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Your Name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Email Address'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Street Address'
        />
        <input
          className={classes.Input}
          type='text'
          name='postcode'
          placeholder='Postcode'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
