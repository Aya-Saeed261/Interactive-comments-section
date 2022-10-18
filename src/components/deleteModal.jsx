const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal p-3 w-100 h-100 position-fixed top-0 left-0 d-flex align-items-center justify-content-center">
      <div className="dialoge bg-white rounded-3">
        <p className="bold dark-blue fs-4">Delete comment</p>
        <p className="grey">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="row m-0">
          <div className="col-6 ps-0 pe-1">
            <button
              type="button"
              className="btn w-100 text-uppercase white bg-gray"
              onClick={() => onCancel()}
            >
              no, cancel
            </button>
          </div>
          <div className="col-6 pe-0 ps-1">
            <button
              type="button"
              className="btn w-100 text-uppercase white bg-red"
              onClick={() => onConfirm()}
            >
              yes, delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
