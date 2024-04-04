import { ReactNode } from 'react';

import { Text } from '@deriv-com/ui';

type TCFDPlatformLayout = {
  children: ReactNode;
  title: string;
};

export const CFDPlatformLayout = ({ children, title }: TCFDPlatformLayout) => (
  <div className='border-solid border-b-1 border-b-system-light-hover-background lg:border-none flex flex-col items-start'>
    <Text weight='bold'>{title}</Text>
    <div className='grid grid-cols-1 gap-16 lg:grid-cols-3 w-full'>{children}</div>
  </div>
);
