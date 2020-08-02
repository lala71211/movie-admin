import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { storage } from "../../helpers/Firebase";

const ImageListView = ({ actor, isSelect, collect, onCheckItem }) => {
  const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/270x400")

  useEffect(() => {
    let pathReference = storage.refFromURL("gs://movie-app-d4c77.appspot.com/avatar");
    if (actor.avatar === null || actor.avatar === undefined) {
      setImgUrl("http://via.placeholder.com/270x400")
    }
    else {
      let starsRef = pathReference.child(actor.avatar);

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
    }
  })
 
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={actor.id}>
      <ContextMenuTrigger id="menu_id" data={actor.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, actor.id)}
          className={classnames({
            active: isSelect
          })}
        >
          <div className="position-relative">
            {/* <NavLink to={`${actor.id}`} className="w-40 w-sm-100">
              <CardImg top alt={actor.name} src={imgUrl} />
            </NavLink> */}
            <CardImg top alt={actor.name} src={imgUrl} />
            <Badge
              color={actor.statusColor}
              pill
              className="position-absolute badge-top-left"
            >
              {actor.status}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${actor.id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label="" />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{actor.name}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {actor.nation}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
