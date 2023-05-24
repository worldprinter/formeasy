import { render } from '@testing-library/react';

import Formeasy from './formeasy';

describe('Formeasy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Formeasy />);
    expect(baseElement).toBeTruthy();
  });
});
