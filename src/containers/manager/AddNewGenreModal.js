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

const AddNewGenreModal = ({ modalOpen, toggleModal, handleChange, handleSubmit, genre }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="genre.add-new-genre-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="genre.genre-name" />
        </Label>
        <Input name="name" onChange={handleChange} value={genre.name} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="genre.cancel" />
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          <IntlMessages id="genre.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewGenreModal;
