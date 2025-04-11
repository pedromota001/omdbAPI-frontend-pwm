import "./modal.css"



const Modal = ({visible, onClose, onSubmit}) => {
    const onHandleSubmit = (event) => {
        event.preventDefault();
        const titulo = event.target.titulo.value.trim();
        const email = event.target.email.value.trim();
        const review = event.target.review.value.trim();
        onSubmit(titulo, email, review);
    }

    if(!visible) return null;
     return (
    <div className="div-modal">
      <div className="div-modal-content">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2>Nova Review</h2>
        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
          />
          <textarea
            name="review"
            placeholder="Sua review"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="button-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button-submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Modal;