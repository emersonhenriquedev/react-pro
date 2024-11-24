import { useDropzone } from "react-dropzone";
import PropTypes from 'prop-types';

export default function DropFileZone(props) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: props.onDrop });

  return (
    <div {...getRootProps()} className="border-2 text-center border-dashed py-8 rounded-lg">
      <input {...getInputProps()} />
      Coloque a imagem aqui
    </div>
  );
}

DropFileZone.propTypes = {
    onDrop: PropTypes.func.isRequired
}
