import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export function toastSuccess(message) {
  toast.success(message, defaultToastOptions);
}

export function toastError(message) {
  toast.error(message, defaultToastOptions);
}
