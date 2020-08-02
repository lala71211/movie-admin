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
// import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { storage } from "../../helpers/Firebase";

const ImageListView = ({ user, isSelect, collect, onCheckItem }) => {
    const [imgUrl, setImgUrl] = useState("http://via.placeholder.com/270x400")
    let flag;
    if (user.delete_flag) {
        flag = "True"
    }
    else {
        flag = "False"
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
        <Colxx sm="6" lg="4" xl="3" className="mb-3" key={user.id}>
            <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
                <Card
                    onClick={event => onCheckItem(event, user.id)}
                    className={classnames({
                        active: isSelect
                    })}
                >
                    <div className="position-relative">
                        {/* <NavLink to={`${user.id}`} className="w-40 w-sm-100">
              <CardImg top alt={user.name} src={imgUrl} />
            </NavLink> */}
                        <CardImg top alt={user.name} src={imgUrl} />
                        {user.roles.map(role => {
                            return (
                                <Badge color="primary" key={role.id} pill className="position-absolute badge-top-left">
                                    {role.name}
                                </Badge>)
                        })
                        }
                    </div>

                    <CardBody>
                        <Row>
                            <Colxx xxs="2">
                                <CustomInput
                                    className="item-check mb-0"
                                    type="checkbox"
                                    id={`check_${user.id}`}
                                    checked={isSelect}
                                    onChange={() => { }}
                                    label="" />
                            </Colxx>
                            <Colxx xxs="10" className="mb-3">
                                <CardSubtitle>{user.name}</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">
                                    {user.username}
                                </CardText>
                                <CardText className="text-muted text-small mb-0 font-weight-light">
                                    {flag}
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
