import { render, screen } from '@testing-library/react';
import { BrandLogo } from './BrandLogo';

describe('BrandLogo', () => {
  it('renders the accessible logo label and default wordmark', () => {
    render(<BrandLogo />);

    expect(
      screen.getByRole('img', { name: /siddhi green excellence logo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('SIDDHI GREEN')).toBeInTheDocument();
  });

  it('renders the compact wordmark when requested', () => {
    render(<BrandLogo compact />);

    expect(screen.getByText('SIDDHI')).toBeInTheDocument();
    expect(screen.queryByText('SIDDHI GREEN')).not.toBeInTheDocument();
  });
});
