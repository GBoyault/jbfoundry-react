import { describe, it, expect } from 'vitest';
import { screen,render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainNavigation } from '..';

describe('MainNavigation', () => {
  it('should render 2 list items, contact and myfonts', () => {
    render(
      <MemoryRouter>
        <MainNavigation />
      </MemoryRouter>
    );

    const items = screen.getAllByRole('listitem');
    const navTexts = items.map((item) => item.textContent);

    expect(items.length).toBe(2);
    expect(navTexts).toEqual(['Contact', 'MyFonts']);
  });
});
