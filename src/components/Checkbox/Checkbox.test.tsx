import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './Checkbox';
import { vi, test, expect } from 'vitest';

const handleFilterMock = vi.fn();

const props: CheckboxProps = {
   label: 'Full-time',
   checked: false,
   handleFilter: handleFilterMock,
};

test('Checkbox toggles when clicked', () => {
   render(<Checkbox {...props} />);
   const checkbox = screen.getByRole('checkbox');
   fireEvent.click(checkbox);
   screen.debug();
   expect(screen.getAllByRole('checkbox', { checked: true }));
   console.log('test all checkbox');
   expect(handleFilterMock).toHaveBeenCalledWith('Full-time');
});
screen.debug();
test('Checkbox toggles off when clicked again', () => {
   render(<Checkbox {...props} checked={true} />);
   const checkbox = screen.getByRole('checkbox');
   fireEvent.click(checkbox);
   expect(screen.getAllByRole('checkbox', { checked: false }));
   expect(handleFilterMock).toHaveBeenCalledWith('Full-time');
});
