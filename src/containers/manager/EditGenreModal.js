import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const EditGenreModal = ({ modalOpen, toggleModal, genre , handleChange, handleSubmit }) => {
  // console.log(genre);
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      // wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="genre.edit-genre-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="genre.genre-name" />
        </Label>
        <Input name="name" value={genre.name} onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          <IntlMessages id="pages.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default React.memo(EditGenreModal)// second argument

