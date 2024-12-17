import { IoMdClose } from "react-icons/io";
import { PropTypes } from "prop-types";

export default function Modal(props) {
  if (!props.isOpen) return null;
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
      <div className="flex flex-col p-6 bg-white rounded-lg gap-y-6 w-96">
        <header className="flex items-center justify-between">
          <span className="text-3xl font-medium">
            {props.title || "Atenção!"}
          </span>
          <button onClick={props.onClose} type="button">
            <IoMdClose className="text-3xl" />
          </button>
        </header>
        <main>
          <p className="text-lg text-gray-800">{props.content}</p>
        </main>
        <footer className="mt-3">
          <div className="flex items-center gap-x-3">
            <button
              onClick={props.onCancel}
              type="button"
              className="flex-1 p-3 text-white bg-red-400 border rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={props.onConfirm}
              type="button"
              className="flex-1 p-3 border rounded-lg"
            >
              Confirmar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
