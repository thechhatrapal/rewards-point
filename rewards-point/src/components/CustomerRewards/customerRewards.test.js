import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomerRewards from './CustomerRewards';
import '@testing-library/jest-dom';

// Mock the axios module
jest.mock('axios');

describe('CustomerRewards Component', () => {
  const mockTransactions = [
    { customerId: '1', transactionDate: '2024-01-15', transactionAmount: 120 },
    { customerId: '1', transactionDate: '2024-02-10', transactionAmount: 90 },
    { customerId: '2', transactionDate: '2024-01-20', transactionAmount: 60 },
    { customerId: '2', transactionDate: '2024-03-05', transactionAmount: 200 },
  ];

  it('should fetch transactions and calculate rewards', async () => {

    axios.get.mockResolvedValue({ data: mockTransactions });

    render(<CustomerRewards />);

    // Wait for the rewards to be calculated and rendered
    await waitFor(() => {
      // Check for Customer ID 1
      expect(screen.getByText('Customer ID: 1')).toBeInTheDocument();

      // Check the specific "January" entry for Customer ID 1
      const januaryCells = screen.getAllByText('January');
      expect(januaryCells[0]).toBeInTheDocument(); // Ensure the first occurrence is present
      expect(screen.getByText('90')).toBeInTheDocument(); // Points for Customer 1 in January
      expect(screen.getByText('February')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument(); // Points for Customer 1 in February

      // Check for Customer ID 2
      expect(screen.getByText('Customer ID: 2')).toBeInTheDocument();

      // Check the specific "January" entry for Customer ID 2
      expect(januaryCells[1]).toBeInTheDocument(); // Ensure the second occurrence is present
      expect(screen.getByText('10')).toBeInTheDocument(); // Points for Customer 2 in January
      expect(screen.getByText('March')).toBeInTheDocument();
      expect(screen.getByText('250')).toBeInTheDocument(); 
    });
  });

  it('should handle error when fetching transactions', async () => {
    // Mock the axios GET request to reject
    axios.get.mockRejectedValue(new Error('Network Error'));

    console.error = jest.fn(); // Mock console.error to suppress error logging

    render(<CustomerRewards />);

    // Wait for component to attempt fetching data
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error loading transactions:', expect.any(Error));
    });
  });
});
