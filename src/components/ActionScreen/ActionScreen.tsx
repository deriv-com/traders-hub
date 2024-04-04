import { ComponentProps, isValidElement, ReactNode } from 'react';

import { Text } from '@deriv-com/ui';

import { cn } from '@/utils';

type TActionScreenProps = {
    children?: ReactNode;
    className?: string;
    description: ReactNode;
    descriptionSize?: ComponentProps<typeof Text>['size'];
    icon?: ReactNode;
    renderButtons?: () => ReactNode;
    title?: string;
    titleSize?: ComponentProps<typeof Text>['size'];
};

/**
 * @description Component to display a screen with an icon, title, description, and buttons.
 * @param children - The children to render.
 * @param className - The class name to apply to the component.
 * @param description - The description to display.
 * @param typeof Text>['size']} descriptionSize - The size of the description text.
 * @param icon - The icon to display.
 * @param renderButtons - The function to render the buttons.
 * @param title - The title to display.
 * @param typeof Text>['size']} titleSize - The size of the title text.
 * @returns JSX.Element The component to render.
 */
export const ActionScreen = ({
    children,
    className,
    description,
    descriptionSize = 'md',
    icon,
    renderButtons,
    title,
    titleSize = 'md',
}: TActionScreenProps) => {
    return (
        <div className={cn('flex flex-col items-center justify-center gap-24 w-auto h-auto rounded-xs', className)}>
            {icon}
            <div className='flex flex-col items-center justify-center gap-8'>
                {title && (
                    <Text size={titleSize} weight='bold'>
                        {title}
                    </Text>
                )}
                {isValidElement(description) ? (
                    description
                ) : (
                    <Text className='text-center' size={descriptionSize}>
                        {description}
                    </Text>
                )}
            </div>
            {renderButtons?.()}
            {children}
        </div>
    );
};
