import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import BreadCrumb from './bread-crumb';

vi.mock('i18next', () => ({
  default: {
    t: (key: string) => key
  }
}));

describe('<BreadCrumb />', () => {
  test('renders superblock and block links', () => {
    render(
      <BreadCrumb
        block='workshop-cat-photo-app'
        superBlock='responsive-web-design-v9'
      />
    );

    expect(
      screen.getByRole('navigation', { name: 'aria.breadcrumb-nav' })
    ).toBeInTheDocument();
    const superBlockLink = screen.getByRole('link', {
      name: 'intro:responsive-web-design-v9.title'
    });
    expect(superBlockLink).toHaveAttribute(
      'href',
      '/learn/responsive-web-design-v9'
    );
    expect(superBlockLink).not.toHaveAttribute('aria-current');

    const blockLink = screen.getByRole('link', {
      name: 'intro:responsive-web-design-v9.blocks.workshop-cat-photo-app.title'
    });
    expect(blockLink).toHaveAttribute(
      'href',
      '/learn/responsive-web-design-v9/#workshop-cat-photo-app'
    );
    expect(blockLink).toHaveAttribute('aria-current', 'page');
  });
});
