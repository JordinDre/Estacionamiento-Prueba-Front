import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast(props) {
  const { info, error, warning, children } = props;

  React.useEffect(() => {
    if (info) {
      toast.info(children);
    } else if (error) {
      toast.error(children);
    } else if (warning) {
      toast.warn(children);
    } else {
      toast.success(children);
    }
  }, [info, error, warning, children]);

  return <ToastContainer position="top-right" autoClose={30000} />;
}
