import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';

const BootstrapButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 14,
  padding: '8px 16px',
  lineHeight: 1.5,
  width: '100%',
  '&:hover': {
    boxShadow: 'none',
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
    fontSize: 14,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
    color: theme.palette.common.white,
    padding: '8px',
  },
}));

export default function CustomButton(props) {
  const { tooltip, color, clicktooltip, ...rest } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleButtonClick = () => {
    if (clicktooltip) {
      setTooltipOpen(!tooltipOpen);
    }
  };
  const buttonClasses = `${props.className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const getColorStyles = (color) => {
    switch (color) {
      case 'primary':
        return {
          backgroundColor: 'rgb(6, 106, 234)',
          color: 'white',
        };
      case 'info':
        return {
          backgroundColor: 'rgb(15, 111, 187)',
          color: 'white',
        };
      case 'orange':
        return {
          backgroundColor: 'rgb(220, 46, 15)',
          color: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: 'rgb(50, 31, 191)',
          color: 'white',
        };
      case 'danger':
        return {
          backgroundColor: 'rgb(186, 6, 24)',
          color: 'white',
        };
      case 'warning':
        return {
          backgroundColor: 'rgb(219, 143, 12)',
          color: 'white',
        };
      case 'success':
        return {
          backgroundColor: 'rgb(14, 91, 61)',
          color: 'white',
        };
      case 'dark':
        return {
          backgroundColor: 'rgb(24, 31, 41)',
          color: 'white',
        };
      default:
        return {};
    }
  };

  const buttonStyles = {
    ...getColorStyles(color),
  };

  return (
    <div className={`mx-0.5 ${props.className}`}>
      {props.clicktooltip ? (
        <BootstrapTooltip title={tooltip} placement="top" open={tooltipOpen}>
          <BootstrapButton
            variant="contained"
            type={props.type ? props.type : 'button'}
            {...rest}
            className={buttonClasses}
            disabled={props.disabled}
            onClick={handleButtonClick}
            style={buttonStyles}
          >
            {props.label}
          </BootstrapButton>
        </BootstrapTooltip>
      ) : (
        <BootstrapTooltip title={tooltip} placement="top">
          <BootstrapButton
            variant="contained"
            type={props.type ? props.type : 'button'}
            {...rest}
            className={buttonClasses}
            disabled={props.disabled}
            style={buttonStyles}
          >
            {props.label}
          </BootstrapButton>
        </BootstrapTooltip>
      )}
    </div>
  );
}
