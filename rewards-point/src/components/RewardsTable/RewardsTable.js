import React from 'react';
import PropTypes from 'prop-types';

const RewardsTable = ({ rewards }) => {
  return (
    <div>
      {Object.keys(rewards).map((customerId) => (
        <div key={customerId}>
          <h2>Customer ID: {customerId}</h2>
          <table border="1">
            {rewards[customerId].monthly && Object.keys(rewards[customerId].monthly).length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rewards[customerId].monthly).map(([month, points]) => (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{points}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{rewards[customerId].total}</strong></td>
                  </tr>
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="2">No rewards available</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{rewards[customerId].total}</strong></td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      ))}
    </div>
  );
};

RewardsTable.propTypes = {
  rewards: PropTypes.object.isRequired,
};

export default RewardsTable;
