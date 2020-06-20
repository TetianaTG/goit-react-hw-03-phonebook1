import React, { Component } from 'react';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { validateAll } from 'indicative/validator';
import Notification from '../Notification/Notification';
import styles from './ContactForm.module.css';

const rules = {
  name: 'required | string',
  number: 'required|min:2|number',
};

const messages = {
  'name.required': 'Please choose a name for contact',
  'number.required': 'Please enter a number',
  'number.min': 'Number must be at least 2 characters',
};

export default class ContactForm extends Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    onAddContact: propTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
    errors: null,
  };

  InputNameId = uuidv4();

  InputNuberId = uuidv4();

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { onAddContact } = this.props;
    e.preventDefault();

    validateAll(this.state, rules, messages)
      .then(data => {
        console.log(data);
        onAddContact({ ...this.state });
        this.reset();
      })
      .catch(errors => {
        console.log(errors);
        const formatedErrors = {};

        errors.forEach(error => {
          formatedErrors[error.field] = error.message;
        });
        this.setState({
          errors: formatedErrors,
        });
      });
  };

  reset = () => {
    this.setState({ name: '', number: '', errors: null });
  };

  render() {
    const { title } = this.props;
    const { name, number, errors } = this.state;

    return (
      <div>
        <h3>{title}</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor={this.InputNameId}>Name:</label>
            <input
              name="name"
              id={this.InputNameId}
              type="text"
              onChange={this.handleChange}
              value={name}
              autoComplete="off"
            />
            {errors && <Notification title={errors.name} />}
          </div>
          <div>
            <label htmlFor={this.InputNuberId}>Number:</label>
            <input
              name="number"
              id={this.InputNuberId}
              type="number"
              onChange={this.handleChange}
              value={number}
              autoComplete="off"
            />
            {errors && <Notification title={errors.number} />}
          </div>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
