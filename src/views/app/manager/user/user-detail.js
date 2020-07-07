import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  TabContent,
  TabPane,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Rating from "../../../../components/common/Rating";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
// import RadialProgressCard from "../../../../components/cards/RadialProgressCard";
import { injectIntl } from "react-intl";
import SmallLineCharts from "../../../../containers/dashboards/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../../containers/dashboards/WebsiteVisitsChartCard";
import NewComments from "../../../../containers/dashboards/NewComments";
import FormikCustomComponents from "../../../../containers/form-validations/FormikCustomComponents";
// import TodoListItem from "../../../../components/applications/TodoListItem"


class UserDetailsPages extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1"
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  render() {
    // const { messages } = this.props.intl;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Chocolate Cake</h1>
            <div className="text-zero top-right-button-container">
              <UncontrolledDropdown>
                <Button
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  <IntlMessages id="pages.delete" />
                </Button>
{/*                
                  <DropdownItem header>
                    <IntlMessages id="pages.add-new" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="pages.edit" />
                  </DropdownItem> */}
                  {/* <DropdownItem divider />
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem> */}
    
              </UncontrolledDropdown>
            </div>

            <Breadcrumb match={this.props.match} />

            <Nav tabs className="separator-tabs ml-0 mb-5">

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "1",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                  to="#"
                >
                  <IntlMessages id="pages.details" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "2",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                  to="#"
                >
                  <IntlMessages id="pages.movie-edit" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "3",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("3");
                  }}
                  to="#"
                >
                  <IntlMessages id="pages.comments" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "4",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("4");
                  }}
                  to="#"
                >
                  <IntlMessages id="pages.reviews" />
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeFirstTab}>

              <TabPane tabId="1">
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <Card className="mb-4">
                      <div className="position-absolute card-top-buttons">
                        <Button outline color={"white"} className="icon-button">
                          <i className="simple-icon-pencil" />
                        </Button>
                      </div>
                      <img
                        src="/assets/img/detail.jpg"
                        alt="Detail"
                        className="card-img-top"
                      />

                      <CardBody>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.overview" />
                        </p>
                        <p className="mb-3">
                          It’s all about simplicity…Less is more. Chocolate Cake
                          exclusively brings you the classic chocolate cake.
                          This cake is the one you always dream of-moist cake
                          and creamy chocolate frosting.
                          <br />
                          <br /> This cake proudly serves itself for a family
                          gathering, a dinner party, a birthday celebration, a
                          baby christening, and a gift to someone special or
                          simply to have on hand on the cake stand at home
                          served with an ice cold glass of milk!
                        </p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.imdb" />
                        </p>
                        <div className="mb-3">
                          <Rating total={5} rating={5} interactive={false} />
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.releaseyear" />
                        </p>
                        <p className="mb-3">$8,14</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.genres" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Flour
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Chocolate
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Caster Sugar
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Baking Powder
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Milk
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Eggs
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Vegetable Oil
                            </Badge>
                          </p>
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.quality" />
                        </p>
                        <p>No</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.language" />
                        </p>
                        <p>No</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.nation" />
                        </p>
                        <p>No</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.adult" />
                        </p>
                        <p>No</p>
                      </CardBody>
                    </Card>
                  </Colxx>

                  <Colxx xxs="12" lg="8">
                    <SmallLineCharts itemClass="dashboard-small-chart-analytics" />
                    <WebsiteVisitsChartCard className="mb-4" controls={false} />
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="2">
                <FormikCustomComponents />
              </TabPane>
              {/* <TabPane tabId="3">
                <TodoListItem />
              </TabPane> */}
              <TabPane tabId="3">
                <NewComments className="mb-4" displayRate={true} />
              </TabPane>
              <TabPane tabId="4">
                <NewComments className="mb-4" displayRate={true} />
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(UserDetailsPages);
