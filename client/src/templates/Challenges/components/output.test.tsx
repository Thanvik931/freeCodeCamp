import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Output } from './output';

const defaultOutputText = '/**\n* Your test output will go here\n*/';

describe('<Output />', () => {
  it('renders defaultOutput when output is empty', () => {
    render(<Output defaultOutput={defaultOutputText} output='' />);

    expect(
      screen.getByText(/Your test output will go here/)
    ).toBeInTheDocument();
  });

  it('does not render the Clear console button when output is empty', () => {
    render(<Output defaultOutput={defaultOutputText} output='' />);

    expect(
      screen.queryByRole('button', { name: /clear console/i })
    ).not.toBeInTheDocument();
  });

  it('renders active output and the Clear console button when output is present', () => {
    render(
      <Output
        defaultOutput={defaultOutputText}
        output='// running tests\nHello world'
      />
    );

    expect(screen.getByText(/Hello world/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clear console/i })
    ).toBeInTheDocument();
  });

  it('calls clearConsole when the Clear console button is clicked', async () => {
    const clearConsole = vi.fn();
    const user = userEvent.setup();

    render(
      <Output
        defaultOutput={defaultOutputText}
        output='// running tests\nConsole log output'
        clearConsole={clearConsole}
      />
    );

    const clearButton = screen.getByRole('button', {
      name: /clear console/i
    });
    await user.click(clearButton);

    expect(clearConsole).toHaveBeenCalledTimes(1);
  });
});
