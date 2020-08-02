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

const ImageActorListView = ({ movie, isSelect, collect, onCheckItem }) => {
  const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/270x400")

  useEffect(() => {
    let pathReference = storage.refFromURL("gs://movie-app-d4c77.appspot.com/poster");
    let starsRef = pathReference.child(movie.poster);

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
  })

  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={movie.id}>
      <ContextMenuTrigger id="menu_id" data={movie.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, movie.id)}
          className={classnames({
            active: isSelect
          })}
        >
          <div className="position-relative">
            <NavLink to={`${movie.id}`} className="w-40 w-sm-100">
              <CardImg top alt={movie.title} src={imgUrl} />
            </NavLink>
            <Badge
              color={movie.statusColor}
              pill
              className="position-absolute badge-top-left"
            >
              {movie.status}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${movie.id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label="" />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{movie.title}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {movie.release_date}
                </CardText>
                <div className="w-40 w-sm-100">
                  {
                    movie.genres.map(genre => {
                      return (
                        <CardText className="text-muted text-small mb-0 font-weight-light">
                          {genre.name}
                        </CardText>)
                    })
                  }
                </div>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageActorListView);
