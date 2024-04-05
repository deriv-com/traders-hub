/** @jsxImportSource react */

import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

jest.mock('@/assets/cfd/ctrader-success.svg?react', () => ({
    __esModule: true,
    default: () => <div>CTraderSuccess</div>,
}));

jest.mock('@/assets/cfd/dxtrade-success.svg?react', () => ({
    __esModule: true,
    default: () => <div>DerivXSuccess</div>,
}));

jest.mock('@/assets/cfd/mt5-derived-success.svg?react', () => ({
    __esModule: true,
    default: () => <div>MT5DerivedSuccess</div>,
}));
