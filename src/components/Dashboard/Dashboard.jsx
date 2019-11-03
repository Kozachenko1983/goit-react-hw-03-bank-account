import React, { Component } from 'react';
import shortid from 'shortid';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import style from './Dashboard.module.css';

export default class Dashboard extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const savedTransactions = localStorage.getItem('savedTransactions');
    if (savedTransactions) {
      this.setState({
        items: JSON.parse(savedTransactions),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.state;
    if (prevState.items !== items) {
      localStorage.setItem('savedTransactions', JSON.stringify(items));
    }
  }

  onTransaction = (dataInput, typeName) => {
    const data = {
      ...dataInput,
      id: shortid(),
      date: new Date().toLocaleString(),
      type: typeName,
    };
    this.setState(prevState => ({
      items: [...prevState.items, data],
    }));
  };

  onSumm = (items, typeTrancaction) => {
    return items
      .filter(el => el.type === typeTrancaction)
      .reduce((acc, el) => {
        let summ = acc;
        summ += el.amount;
        return summ;
      }, 0);
  };

  render() {
    const { items } = this.state;
    const income = this.onSumm(items, 'Deposit');
    const expenses = this.onSumm(items, 'Withdraw');
    const balance = income - expenses;
    return (
      <div className={style.wrapper}>
        <Controls onTransaction={this.onTransaction} balance={balance} />
        <Balance income={income} expenses={expenses} balance={balance} />
        {!!items.length && <TransactionHistory items={items} />}
      </div>
    );
  }
}
