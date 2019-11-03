import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import style from './Controls.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default class Controls extends Component {
  static propTypes = {
    onTransaction: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    amount: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: Number(value),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const type = e.target.name;
    if (this.state.amount <= 0) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    if (
      e.target.name === 'Withdraw' &&
      this.props.balance < this.state.amount
    ) {
      this.notify('На счету недостаточно средств для проведения операции! ');
      return;
    }
    this.props.onTransaction({ ...this.state }, type);
    this.setState({
      amount: '',
    });
  };

  notify = msg => {
    toast.error(msg);
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={style.controls}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <input
            className={style.input}
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <button
            className={style.button}
            type="button"
            name="Deposit"
            onClick={this.handleSubmit}
          >
            Deposit
          </button>
          <button
            className={style.button}
            type="button"
            name="Withdraw"
            onClick={this.handleSubmit}
          >
            Withdraw
          </button>
        </form>
        <ToastContainer />
      </section>
    );
  }
}
