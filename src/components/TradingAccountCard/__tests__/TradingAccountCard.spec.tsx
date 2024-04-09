import { render, screen } from '@testing-library/react';

import { TradingAccountCard } from '../TradingAccountCard';

describe('TradingAccountCard', () => {
    it('renders children correctly', () => {
        render(<TradingAccountCard>Test Child</TradingAccountCard>);

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('renders leading content correctly', () => {
        const leading = () => <div>Leading Content</div>;
        render(<TradingAccountCard leading={leading}>Test Child</TradingAccountCard>);

        expect(screen.getByText('Leading Content')).toBeInTheDocument();
    });

    it('renders trailing content correctly', () => {
        const trailing = () => <div>Trailing Content</div>;
        render(<TradingAccountCard trailing={trailing}>Test Child</TradingAccountCard>);

        expect(screen.getByText('Trailing Content')).toBeInTheDocument();
    });
});
