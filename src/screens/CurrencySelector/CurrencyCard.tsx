import { useFormikContext } from 'formik';

import { StandaloneCircleInfoRegularIcon as CircleInfoIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/ui';

import { IconComponent } from '@/components';
import { cn } from '@/utils';

type TCurrencyCard = {
    className?: string;
    id: string;
    info?: boolean;
    isDisabled?: boolean;
    title: string;
    wrapperClassName?: string;
};

/**
 * @name CurrencyCard
 * @description The CurrencyCard component is used to display the currency card in the currency selector screen.
 * @param id - The id of the currency.
 * @param info - The info of the currency.
 * @param title - The title of the currency.
 * @param wrapperClassName - The wrapperClassName of the currency.
 * @param className - The className of the currency.
 * @param isDisabled - The isDisabled of the currency.
 * @returns React.ReactNode
 * @example <CurrencyCard id={id} info={info} title={title} />
 */
export const CurrencyCard = ({ id, info, title, wrapperClassName = '', className = '', isDisabled }: TCurrencyCard) => {
    const { setFieldValue, values } = useFormikContext<{ currency: string }>();
    const isSelected = values.currency === id;
    return (
        <div className={cn(`relative flex justify-center w-1/2 my-8 lg:w-1/4 ${wrapperClassName}`)}>
            <button
                className={cn(
                    `flex flex-col w-10/12 rounded-default items-center py-22 hover:cursor-pointer ${
                        isSelected
                            ? 'outline outline-2 outline-status-light-success'
                            : 'hover:outline outline-1 hover:outline-system-light-less-prominent'
                    } ${className} ${isDisabled && 'opacity-25 pointer-events-none'}`
                )}
                onClick={!isDisabled ? () => setFieldValue('currency', isSelected ? '' : id) : undefined}
                type='button'
            >
                <IconComponent icon={id} />
                {info && <CircleInfoIcon className='absolute top-0 opacity-50' />}
                <div className='flex flex-col items-center gap-4 pt-4'>
                    <Text as='p' className='my-4' size='sm' weight={isSelected ? 'bold' : 'normal'}>
                        {title}
                    </Text>
                    <Text as='p' size='sm' weight={isSelected ? 'bold' : 'normal'}>
                        ({id})
                    </Text>
                </div>
            </button>
        </div>
    );
};
