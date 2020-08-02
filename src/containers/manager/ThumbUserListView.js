import React, { useEffect, useState } from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { storage } from "../../helpers/Firebase";

const ThumbuserListView = ({ user, isSelect, collect, onCheckItem }) => {
  const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/92x136")
  let flag;
  if (user.delete_flag) {
      flag = "Disable"
  }
  else {
      flag = "Enable"
  }
  useEffect(() => {
    // let pathReference = storage.refFromURL("gs://movie-app-d4c77.appspot.com/avatar");
    if (user.image_url === null || user.image_url === undefined) {
      setImgUrl("http://via.placeholder.com/270x400")
    }
    else {
    //   let starsRef = pathReference.child(user.avatar);

    //   starsRef
    //     .getDownloadURL()
    //     .then((url) => {
    //       // let img = document.querySelector(".avatar");
    //       setImgUrl(url)
    //     })
    //     .catch((error) => {
    //       // console.log(error);
    //       switch (error.code) {
    //         case "storage/object-not-found":
    //           break;

    //         case "storage/unauthorized":
    //           // User doesn't have permission to access the object
    //           break;

    //         case "storage/unknown":
    //           // Unknown error occurred, inspect the server response
    //           break;

    //         default:
    //           break;
    //       }
    //     });

        setImgUrl(user.image_url)

    }
  })

  return (
    <Colxx xxs="12" key={user.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, user.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          {/* <NavLink to={`?p=${user.id}`} className="d-flex">
          </NavLink> */}
            <img
              alt={user.name}
              src={imgUrl}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* <NavLink to={`?p=${user.id}`} className="w-40 w-sm-100">
              </NavLink> */}
                <p className="list-item-heading mb-1 truncate">
                  {user.name}
                </p>
              {/* <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {user.view}
              </p> */}
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {user.username}
              </p>
              <div className="w-40 w-sm-100">
                {
                  user.roles.map(role => {
                    return (
                      <Badge color="primary" key={role.id} pill>
                        {role.name}
                      </Badge>)
                  })
                }
              </div>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {flag}
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${user.id}`}
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
export default React.memo(ThumbuserListView);
