// DownwardOnlyPopper.tsx
import React from 'react';
import { Popper, PopperProps } from '@mui/material';

const DownwardOnlyPopper: React.FC<PopperProps> = (props) => {
  return (
    <Popper
      {...props}
      placement="bottom-start" // Ensures dropdown always opens downward
      modifiers={[
        {
          name: 'flip',
          enabled: false, // Disable flipping behavior
        },
      ]}
    />
  );
};

export default DownwardOnlyPopper;
