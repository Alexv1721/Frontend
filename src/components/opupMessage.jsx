import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopupMessage = ({ message, type }) => {
  if (type === 'warn') {
    toast.warning(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'suc') {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return null; 
};

export default PopupMessage;
