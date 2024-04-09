import { ReactNode } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { TradingAccountCardContent, TradingAccountCardLightButton } from '../TradingAccountCardComponent';

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
    Button: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Get</button>,
}));

describe('TradingAccountCardContent', () => {
    it('renders title and children correctly', () => {
        render(<TradingAccountCardContent title='Test Title'>Test Child</TradingAccountCardContent>);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});

describe('TradingAccountCardLightButton', () => {
    it('handles onSubmit correctly', () => {
        const onSubmitMock = jest.fn();
        render(<TradingAccountCardLightButton onSubmit={onSubmitMock} />);

        fireEvent.click(screen.getByText('Get'));

        expect(onSubmitMock).toHaveBeenCalled();
    });
});
