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

const AddNewActorModal = ({ modalOpen, toggleModal, handleChange, handleSubmit, handleChangeSelect, actor, handleImage }) => {
  const selectData = [
    { label: "Trung Quốc", value: "tq", key: 0 },
    { label: "Việt Nam", value: "vn", key: 1 },
    { label: "Mỹ", value: "usa", key: 2 }
  ];
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="forms.add-new-actor-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="forms.actor-name" />
        </Label>
        <Input name="name" onChange={handleChange} value={actor.name} />
        <Label style={{ marginTop:"10px" }}>
          <IntlMessages id="forms.actor-nation" />
        </Label>
        <SingleReactSelect handleChangeSelect={handleChangeSelect} selectedOption={actor.nation} options={selectData} isMulti={false}/>
        <Label>
          <IntlMessages id="forms.actor-avatar" />
        </Label>
        <DropzoneExample eventHandler={handleImage}/>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="forms.cancel" />
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          <IntlMessages id="forms.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewActorModal;
