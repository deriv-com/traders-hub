import { StandaloneCheckBoldIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/ui';

import { cn } from '@/utils';

import { desktopStyle, stepperVariants } from './ProgressBar.classnames';
import { StepConnector } from './StepConnector';

export type TSteps = string[];

type TStepperProps = {
    isActive: boolean;
    isFilled?: boolean;
    step: TSteps[number];
    stepCount: number;
};

/**
 * @name Stepper
 * @description Stepper component for ProgressBar
 * @param isActive - Whether the step is active
 * @param isFilled - Whether the step is filled
 * @param step - The step number
 * @param stepCount - The total number of steps
 * @returns JSX.Element
 */
export const Stepper = ({ isActive, isFilled = false, step, stepCount }: TStepperProps) => (
    <div aria-current={isActive} className={cn('relative items-center', desktopStyle.stepper)}>
        <div className='flex flex-col items-center self-center'>
            {stepCount !== 0 && <StepConnector isActive={isActive} />}
            <span className={stepperVariants({ isActive, isFilled })}>
                {isFilled && <StandaloneCheckBoldIcon className={isActive ? 'fill-white' : 'fill-black'} />}
            </span>
        </div>
        <Text as='p' size='sm' weight={isActive ? 'bold' : 'normal'}>
            {step}
        </Text>
    </div>
);
