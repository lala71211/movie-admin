import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink, } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";

// import { comments } from "../../data/comments";
import Rating from "../../components/common/Rating";


function NewComments({ deleteFlag, className = "", displayRate = false, comment = [] }) {
  // console.log(comment)
  return (
    <Card className={className}>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.new-comments" />
        </CardTitle>
        <div className="dashboard-list-with-user" style={{ height: '540px' }}>
          <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }} >
            {comment.map((item, index) => {
              return (
                <div key={index}
                  className="d-flex flex-row mb-3 pb-3 border-bottom">
                  <img
                    src={item.avatar}
                    alt={item.username}
                    className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                  />
                  <div className="pl-3 pr-2">

                    <p className="font-weight-medium mb-0"> đăng lúc: {item.createAt} bởi {item.username}
                     <Button color="danger"
                      style={{ marginLeft:"1200px"}}
                      onClick={() => deleteFlag(item.id)}>Xóa</Button>
                    </p>
                    <p className="text-muted mb-0 text-small">
                      {item.content}
                    </p>
                    {displayRate && (
                      <div className="form-group mb-1 mt-2">
                        <Rating total={5} rating={5} interactive={false} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewComments;