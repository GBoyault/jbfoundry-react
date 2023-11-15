import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '..';

describe('Header', () => {
  it('should render h1 Jean Boyault', () => {
    // Arrange
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const heading = 'Jean Boyault';
    // Act
    // Expect
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(heading);
  });
});
