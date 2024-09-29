import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardsTable from './RewardsTable';  // Adjust the path if needed
import '@testing-library/jest-dom';

describe('RewardsTable', () => {
  const mockRewards = {
    '1': {
      monthly: {
        January: 150,
        February: 200,
      },
      total: 350,
    },
    '2': {
      monthly: {
        January: 100,
        March: 250,
      },
      total: 350,
    },
  };

  
//   it('should render reward data for each customer', () => {
//     render(<RewardsTable rewards={mockRewards} />);

//     // Check if the customer ID 1 is displayed
//     // expect(screen.getByText('Customer ID: 1')).toBeInTheDocument();

//     // // Check if the points for January and February for customer 1 are displayed
//     // const januaryPoints = screen.getAllByText('January');
//     // expect(januaryPoints[0]).toBeInTheDocument(); // First January should be for Customer 1
//     expect(screen.getByText('150')).toBeInTheDocument();
//     expect(screen.getByText('February')).toBeInTheDocument();
//     expect(screen.getByText('200')).toBeInTheDocument();

//     // Check the total points for customer 1
//     expect(screen.getByText('Total')).toBeInTheDocument();
//     expect(screen.getByText('350')).toBeInTheDocument();

//     // Check if the customer ID 2 is displayed
//     expect(screen.getByText('Customer ID: 2')).toBeInTheDocument();

//     // Check if the points for January and March for customer 2 are displayed
//     expect(januaryPoints[1]).toBeInTheDocument(); // Second January should be for Customer 2
//     expect(screen.getByText('100')).toBeInTheDocument();
//     expect(screen.getByText('March')).toBeInTheDocument();
//     expect(screen.getByText('250')).toBeInTheDocument();

//     // Check the total points for customer 2
//     expect(screen.getByText('Total')).toBeInTheDocument();
//     expect(screen.getByText('350')).toBeInTheDocument();
//   });
  it('should render an empty table when no rewards data is available', () => {
    const emptyRewards = {};

    render(<RewardsTable rewards={emptyRewards} />);

    // Check that no customer data is displayed
    expect(screen.queryByText('Customer ID:')).not.toBeInTheDocument();
  });

  it('should handle customers with no monthly rewards', () => {
    const rewardsWithNoMonthlyData = {
      '1': {
        monthly: {},
        total: 0,
      },
    };

    render(<RewardsTable rewards={rewardsWithNoMonthlyData} />);

    // Check that customer ID is displayed
    expect(screen.getByText('Customer ID: 1')).toBeInTheDocument();

    // Check that no monthly data is displayed
    expect(screen.queryByText('Month')).not.toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
