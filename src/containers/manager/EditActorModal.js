import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardImg,
  Input,
  Label
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import DropzoneExample from "../forms/DropzoneExample";
import SingleReactSelect from "../forms/SingleReactSelect";
import { storage } from "../../helpers/Firebase";

const EditActorModal = ({ modalOpen, toggleEditModal, handleChange, handleSubmit, handleChangeSelect, actor,handleImage }) => {
// console.log(actor)
const selectData = [
  { label: "Trung Quốc", value: "tq", key: 0 },
  { label: "Việt Nam", value: "vn", key: 1 },
  { label: "Mỹ", value: "usa", key: 2 }
];
const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/92x136")
  useEffect(() => {
    if (actor.image != null) {
    let pathReference = storage.refFromURL("gs://movie-app-d4c77.appspot.com/avatar");
    let starsRef = pathReference.child(actor.image);

    starsRef
      .getDownloadURL()
      .then((url) => {
        // let img = document.querySelector(".avatar");
        setImgUrl(url)
      })
      .catch((error) => {
        // console.log(error);
        switch (error.code) {
          case "storage/object-not-found":
            break;

          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;

          default:
            break;
        }
      });
  }})
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
      {/* <img
              alt={actor.name}
              src={imgUrl}
              className="list-thumbnail responsive border-0 card-img-left"
              style={{ marginBottom: "15px", height:"1%", width:"1%" }}
            /> */}
             <CardImg top alt={actor.name} src={imgUrl} width ="80px" height="500px"/>
        <Label>
          <IntlMessages id="forms.actor-name" />
        </Label>
        <Input name="name" onChange={handleChange} value={actor.name} style={{ marginBottom:"15px"}}/>
        <Label style={{ marginTop:"10px" }}>
          <IntlMessages id="forms.actor-nation" />
        </Label>
        <SingleReactSelect handleChangeSelect={handleChangeSelect} selectedOption={actor.nation} options={selectData} isMulti={false}/>
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
