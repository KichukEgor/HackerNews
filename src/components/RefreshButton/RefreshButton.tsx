import React, { FC } from 'react';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Refresh } from '@mui/icons-material';

type TProps = {
  label: string;
  onClick: () => Promise<void>;
  isLoading: boolean;
}

const RefreshButton: FC<TProps> = ({ label, isLoading, onClick }) => (
  <Tooltip title={label}>
    <span>
      <IconButton
        aria-label="Refresh"
        onClick={onClick}
        disabled={isLoading}
      >
        <Refresh
          fontSize="large"
          color="primary"
          style={{
            animation: isLoading
              ? 'rotate 2s linear infinite'
              : 'none',
          }}
        />
      </IconButton>
    </span>
  </Tooltip>
);

export default RefreshButton;
