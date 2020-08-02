import React, { useEffect, useState } from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { storage } from "../../helpers/Firebase";

const ThumbActorListView = ({ actor, isSelect, collect, onCheckItem }) => {
  const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/92x136")
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
    <Colxx xxs="12" key={actor.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={actor.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, actor.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <NavLink to={`?p=${actor.id}`} className="d-flex">
            <img
              alt={actor.name}
              src={imgUrl}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* <NavLink to={`?p=${actor.id}`} className="w-40 w-sm-100">
              </NavLink> */}
              <p className="list-item-heading mb-1 truncate">
                {actor.name}
              </p>
              {/* <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {actor.view}
              </p> */}
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {actor.nation}
              </p>
              {/* <div className="w-40 w-sm-100">
                {
                  actor.genres.map(genre => {
                    return (
                      <Badge color="primary" key={genre.id} pill>
                        {genre.name}
                      </Badge>)
                  })
                }

              </div> */}
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${actor.id}`}
                checked={isSelect}
                onChange={() => { }}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbActorListView);
