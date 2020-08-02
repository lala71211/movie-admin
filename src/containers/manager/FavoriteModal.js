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
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";   
// import DropzoneExample from "../forms/DropzoneExample";
// import SingleReactSelect from "../forms/SingleReactSelect";

const FavoriteModal = ({ modalOpen, toggleModal, user, favorite}) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
       {user.name}
      </ModalHeader>
      <ModalBody>
       
        <Row className="mb-5">
        <Colxx xxs="20" style={{paddingLeft:"15px", marginTop:"20px"}}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle> 
                  <IntlMessages id="table.favorite" />
                </CardTitle>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Movie Id</th>
                      <th>Movie Name</th>
                      <th>Current Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorite.map(item =>
                        <tr>
                        <th scope="row">{item.id}</th>
                         <td>{item.movie_id}</td>
                         <td>{item.movie_name}</td>  
                         <td>{item.current_time}</td>
                        </tr>)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
          </Row>
      </ModalBody>
    </Modal>
  );
};

export default FavoriteModal;
