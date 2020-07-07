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
import DropzoneExample from "../forms/DropzoneExample";
import SingleReactSelect from "../forms/SingleReactSelect";

const EditActorModal = ({ modalOpen, toggleEditModal, handleChange, handleSubmit, handleChangeSelect, actor={ id: 0, name: "", nation:null, avatar:null},handleImage }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleEditModal}
      backdrop="static"
    >
      <ModalHeader toggle={toggleEditModal}>
        <IntlMessages id="forms.edit-actor-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="forms.actor-name" />
        </Label>
        <Input name="name" onChange={handleChange} value={actor.name} placeholder={actor.name} />
        <Label>
          <IntlMessages id="forms.actor-nation" />
        </Label>
        <SingleReactSelect handleChangeSelect={handleChangeSelect} selectedOption={actor.nation} placeholder={actor.nation}/>
        <Label>
          <IntlMessages id="forms.actor-avatar" />
        </Label>
        <DropzoneExample  eventHandler={handleImage}/>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleEditModal}>
          <IntlMessages id="forms.cancel" />
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          <IntlMessages id="forms.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditActorModal;
