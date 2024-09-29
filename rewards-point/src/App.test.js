import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Adjust the import based on your file structure

describe('App Component', () => {
  it('should render the header text', () => {
    render(<App />);

    // Check if the header text is in the document
    expect(screen.getByText('Retailer Rewards Program')).toBeInTheDocument();
  });

  it('should render the CustomerRewards component', () => {
    render(<App />);

    // Check if the CustomerRewards component is rendered
    // This assumes that the CustomerRewards component has some identifiable text or element.
    expect(screen.getByText('Customer ID:')).toBeInTheDocument(); // Adjust this based on what the component renders initially
  });
});
