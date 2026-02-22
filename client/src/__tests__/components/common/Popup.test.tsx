import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from '../../../components/common/Popup';

describe('Popup', () => {
  it('renders with the given type and text props', () => {
    render(<Popup type="success" text="Operation completed successfully" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Operation completed successfully');
    expect(screen.getByRole('alert')).toHaveClass('success');
  });

  it('renders with error type', () => {
    render(<Popup type="error" text="Something went wrong" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('alert')).toHaveClass('error');
  });

  it('renders with warning type', () => {
    render(<Popup type="warning" text="Please check your input" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Please check your input');
    expect(screen.getByRole('alert')).toHaveClass('warning');
  });

  it('renders within alert-popup container', () => {
    const { container } = render(<Popup type="info" text="Info message" />);

    expect(container.querySelector('.alert-popup')).toBeInTheDocument();
    expect(container.querySelector('.alert')).toBeInTheDocument();
  });
});
