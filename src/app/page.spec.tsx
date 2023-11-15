import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

describe('Home', () => {
    it('renders start template text', () => {
        render(<Home />);

        const textElement = screen.getByText('Next.js - Boilerplate');

        expect(textElement).toBeInTheDocument();
    });
});
