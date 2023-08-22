import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
describe('App', () => {
  it('should work as expected', () => {
    const { getByText } = render(<App />);

    expect(getByText('Hello World!')).toBeInTheDocument();
  });
});
