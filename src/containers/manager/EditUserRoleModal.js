import React, { useEffect, useState } from "react";
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
import SingleReactSelect from "../forms/SingleReactSelect";

const EdituserModal = ({ modalOpen, toggleEditModal, handleSubmit, handleChangeSelect, user }) => {
    const selectData = [
        { label: "ROLE_USER", value: "ROLE_USER", key: 1 },
        { label: "ROLE_USER_VIP", value:"ROLE_USER_VIP", key: 2 },
        { label: "ROLE_ADMIN", value: "ROLE_ADMIN", key: 3 },
      ];
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleEditModal}
      backdrop="static"
    >
      <ModalHeader toggle={toggleEditModal}>
        <IntlMessages id="forms.edit-user-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="forms.user-name" />
        </Label>
        <Input name="name" value={user.name} disabled/>
        <Label style={{marginTop:"10px"}}>
          <IntlMessages id="forms.user-role" />
        </Label>
        <SingleReactSelect handleChangeSelect={handleChangeSelect} selectedOption={user.role} options={selectData} isMulti={true}/>
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

export default EdituserModal;
