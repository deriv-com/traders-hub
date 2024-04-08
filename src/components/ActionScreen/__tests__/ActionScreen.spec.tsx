import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { ActionScreen } from '../ActionScreen';

jest.mock('@deriv-com/ui', () => ({
    Text: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('ActionScreen', () => {
    it('renders the title and description', () => {
        render(
            <ActionScreen
                title='Test Title'
                description='Test Description'
                renderButtons={() => <button>Click me</button>}
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders the children', () => {
        render(
            <ActionScreen
                title='Test Title'
                description='Test Description'
                renderButtons={() => <button>Click me</button>}
            >
                <div>Test Child</div>
            </ActionScreen>
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('renders a description that is a React element', () => {
        render(
            <ActionScreen
                title='Test Title'
                description={<span>Test Description Element</span>}
                renderButtons={() => <button>Click me</button>}
            />
        );

        expect(screen.getByText('Test Description Element')).toBeInTheDocument();
    });

    it('renders a description that is a string', () => {
        render(
            <ActionScreen
                title='Test Title'
                description='Test Description String'
                renderButtons={() => <button>Click me</button>}
            />
        );

        expect(screen.getByText('Test Description String')).toBeInTheDocument();
    });
});
