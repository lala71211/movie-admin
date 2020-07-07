import React, { useEffect, useState } from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { storage } from "../../helpers/Firebase";

const ThumbListView = ({ movie, isSelect, collect, onCheckItem }) => {
  const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/92x136")
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
    <Colxx xxs="12" key={movie.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={movie.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, movie.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <NavLink to={`?p=${movie.id}`} className="d-flex">
            <img
              alt={movie.title}
              src={imgUrl}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${movie.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {movie.title}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {movie.view}
              </p>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {movie.release_date}
              </p>
              <div className="w-40 w-sm-100">
                {
                  movie.genres.map(genre => {
                    return (
                      <Badge color="primary" key={genre.id} pill>
                        {genre.name}
                      </Badge>)
                  })
                }

              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${movie.id}`}
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
export default React.memo(ThumbListView);
