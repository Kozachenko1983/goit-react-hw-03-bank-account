import React from 'react';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ income, expenses, balance }) => (
  <section className={style.balance}>
    <span>Income: {income}$</span>
    <span>Expenses: {expenses}$</span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
