import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";

import FormikCustomComponents from "../../../../containers/form-validations/FormikCustomComponents";
// import TooltipLocations from "../../../../containers/form-validations/TooltipLocations";

export default class FormValidationsUi extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="menu.new-movie"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xs="12" className="mb-3">
            <FormikCustomComponents />
          </Colxx>
        </Row>

        {/* <Row>
          <Colxx xs="12">
            <h5 className="mb-4">Tooltip Positioning</h5>
            <TooltipLocations />
          </Colxx>
        </Row> */}
      </Fragment>
    );
  }
}