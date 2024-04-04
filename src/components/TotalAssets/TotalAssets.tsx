import { twMerge } from 'tailwind-merge';

import { Text } from '@deriv-com/ui';

import { useActiveDerivTradingAccount } from '@/hooks';

const TotalAssets = () => {
  const { data: activeDerivTradingAccount } = useActiveDerivTradingAccount();

  return (
    <div className='relative lg:inline-block text-center lg:text-right w-full lg:w-auto flex justify-center mt-24 lg:mt-0'>
      <div className='d-none lg:block'>
        <Text size='sm'>Total assets</Text>
      </div>
      <Text
        as='p'
        className={twMerge(
          'underline text-status-light-information decoration-dotted decoration-system-light-less-prominent-text underline-offset-8 flex flex-col items-end text-4xl',
          !activeDerivTradingAccount?.is_virtual && 'text-status-light-success'
        )}
        weight='bold'
      >
        0.00 USD
      </Text>
    </div>
  );
};

export default TotalAssets;
