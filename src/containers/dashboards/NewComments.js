import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";

// import { comments } from "../../data/comments";
import Rating from "../../components/common/Rating";


function NewComments({ className = "", displayRate = false, comment = [] }) {
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
                  <NavLink to="/app/manager/users/1">
                    <img
                      src={item.avatar}
                      alt={item.username}
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                  </NavLink>

                  <div className="pl-3 pr-2">
                    <NavLink to="/app/manager/users/1">
                      <p className="font-weight-medium mb-0"> đăng lúc: {item.createAt} bởi {item.username}
                        {/* <i className="simple-icon-user" position="asolute-right"/> */}
                      </p>
                      <p className="text-muted mb-0 text-small">
                        {item.content}
                      </p>
                      {displayRate && (
                        <div className="form-group mb-1 mt-2">
                          <Rating total={5} rating={5} interactive={false} />
                        </div>
                      )}
                    </NavLink>
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