import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Button from './Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonProps = {
    onClick: handleClickOpen,
    type: 'button',
    label: props.button,
    tooltip: props.tooltip,
    color: props.color,
  };

  return (
    <>
      <Button {...buttonProps} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={props.size}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={isMobile}
        classes={{
          paperFullScreen: 'modal-fullscreen',
        }}
      >
        <div className="modal-header">
          <h1 className='bg-blue-100 pr-10 text-blue-800 text-xl font-extrabold text-center py-3 rounded-t-lg border border-blue-400'>{props.title}</h1>
          <IconButton
            aria-label="Cerrar"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'black', padding: '4px' }}
          >
            <CloseIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </div>

        <div className="modal-content">
          {open && (
            <div className='md:px-6 px-2 md:mb-8 mb-4 md:pb-2 pb-6'>
              {React.Children.map(props.children, child => {
                return React.cloneElement(child, { cerrarModal: handleClose, modalAbierto: open });
              })}
            </div>
          )}
        </div>
      </Dialog>
      <style>
        {`
        .modal-fullscreen {
          width: 100%;
          height: auto;
          max-height: 90%;
          overflow-y: hidden;
        }
        
        .modal-header {
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 1;
        }
        
        .modal-content {
          overflow-y: auto;
          max-height: calc(90% - 60px); /* Subtracting the header height */
        }
        `}
      </style>
    </>
  );
}