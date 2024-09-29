import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RewardsTable from '../RewardsTable/RewardsTable'

const CustomerRewards = () => {
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        const data = response.data;
        const calculatedRewards = calculateRewards(data);
        setRewards(calculatedRewards);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };
    loadData();
  }, []);

  const calculateRewards = (transactions) => {
    const rewardsMap = {};
    transactions.forEach((tx) => {
      const { customerId, transactionDate, transactionAmount } = tx;
      const date = new Date(transactionDate);
      const month = date.toLocaleString('default', { month: 'long' });

      if (!rewardsMap[customerId]) {
        rewardsMap[customerId] = { monthly: {}, total: 0 };
      }

      if (!rewardsMap[customerId].monthly[month]) {
        rewardsMap[customerId].monthly[month] = 0;
      }

      const points = calculatePoints(transactionAmount);
      rewardsMap[customerId].monthly[month] += points;
      rewardsMap[customerId].total += points;
    });
    return rewardsMap;
  };

  const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += 2 * (amount - 100);
      points += 50; // For the $50 between $50 and $100
    } else if (amount > 50) {
      points += (amount - 50);
    }
    return points;
  };

  return <RewardsTable rewards={rewards} />;
};

export default CustomerRewards;
