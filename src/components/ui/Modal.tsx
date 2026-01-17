type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center px-4 z-50">
      <div className="glass max-w-xl w-full p-6 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
