import { cn } from '@/utils';

import { desktopStyle, mobileStyle } from './ProgressBar.classnames';

/**
 * @name StepConnector
 * @description StepConnector component for ProgressBar
 * @param isActive - Whether the step is active
 * @returns JSX.Element
 */
export const StepConnector = ({ isActive }: { isActive?: boolean }) => (
    <div
        aria-current={isActive}
        className={cn(
            'via-solid-grey-default to-solid-grey-default from-solid-coral-700 from-50% via-50% transition-all duration-700 ease-out',
            mobileStyle.connector,
            desktopStyle.connector
        )}
    >
        {' '}
    </div>
);
