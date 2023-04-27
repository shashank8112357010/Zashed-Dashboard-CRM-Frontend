import { toast } from 'react-toastify';

const Toast = (isError, message) => {
    
      const option = { timeOut: 5000 };
      if (isError) {
        toast.error(message, option);
        return;
      }
      toast.success(message, option);
}

export default Toast