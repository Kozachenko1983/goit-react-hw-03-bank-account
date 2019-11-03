import React from 'react';
import PropTypes from 'prop-types';
import style from './TransacyioHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className={style.table}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(el => (
        <tr key={el.id}>
          <td>{el.type}</td>
          <td>{el.amount} $</td>
          <td>{el.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
