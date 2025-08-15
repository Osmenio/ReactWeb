import './LoadingModal.scss';

interface LoadingModalProps {
  show: boolean;
}

const LoadingModal = ({
  show,
}: LoadingModalProps) => {
  if (!show) return null;
  return (
    <div className="loading_container">
      <div className="loading_box">
        <div className="spinner" />
        <div className="loading_text" >
          Carregando . . .
        </div>
      </div>
    </div>
  );
};

export { LoadingModal };
