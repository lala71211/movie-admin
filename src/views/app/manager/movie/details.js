import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import IntlMessages from "../../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import GlideComponentThumbs from "../../../../components/carousel/GlideComponentThumbs";
import { detailImages, detailThumbs } from "../../../../data/carouselItems";
import CommentWithLikes from "../../../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../../../data/comments";
import Rating from "../../../../components/common/Rating";
import { Colxx } from "../../../../components/common/CustomBootstrap";

class DetailsPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
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
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" xl="8" className="col-left">
            <Card className="mb-4">
              <CardBody>
                <GlideComponentThumbs settingsImages={
                  {
                    bound: true,
                    rewind: false,
                    focusAt: 0,
                    startAt: 0,
                    gap: 5,
                    perView: 1,
                    data: detailImages,
                  }
                } settingsThumbs={
                  {
                    bound: true,
                    rewind: false,
                    focusAt: 0,
                    startAt: 0,
                    gap: 10,
                    perView: 5,
                    data: detailThumbs,
                    breakpoints: {
                      576: {
                        perView: 4
                      },
                      420: {
                        perView: 3
                      }
                    }
                  }
                } />
              </CardBody>
            </Card>

          </Colxx>

          <Colxx xxs="12" xl="4" className="col-right">
            <Card className="mb-4">
              <CardBody>
                <p className="text-muted text-small mb-2">
                  <IntlMessages id="pages.description" />
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
                  <IntlMessages id="pages.rating" />
                </p>

                <div className="mb-3">
                  <Rating total={5} rating={5} interactive={false} />
                </div>
                <p className="text-muted text-small mb-2">
                  <IntlMessages id="pages.rating" />
                </p>
                <p className="mb-3">
                  3
                </p>
                <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                <p className="mb-3">
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>FRONTEND</Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>JAVASCRIPT</Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>SECURITY</Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>DESIGN</Badge>
                </p>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12">
            <Card className="mb-4">
              <CardHeader>
                <Nav tabs className="card-header-tabs ">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true
                      })}
                      onClick={() => { this.toggleTab("1"); }} to="#" >
                      <IntlMessages id="pages.details-title" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "2",
                        "nav-link": true
                      })}
                      onClick={() => { this.toggleTab("2"); }} to="#" >
                      <IntlMessages id="pages.comments-title" />(19)
                      </NavLink>
                  </NavItem>

                </Nav>
              </CardHeader>

              <TabContent activeTab={this.state.activeFirstTab}>

                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <p className="font-weight-bold">Augue Vitae Commodo</p>
                        <p>
                          Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.                              <br />
                          <br />
                              Nulla non purus fermentum, pulvinar dui condimentum, malesuada nibh. Sed viverra quam urna, at condimentum ante viverra non. Mauris posuere erat sapien, a convallis libero lobortis sit amet. Suspendisse in orci tellus.
                            </p>
                        <br />
                        <p className="font-weight-bold">Phasellus Efficitur</p>
                        <p>
                          Tellus a sem condimentum, vitae convallis sapien feugiat.Aenean non nibh nec nunc aliquam iaculis. Ut quis suscipit nunc. Duis at lectusa est aliquam venenatis vitae eget arcu. Sed egestas felis eget convallismaximus. Curabitur maximus, ligula vel sagittis iaculis, risus nisi tinciduntsem, ut ultricies libero nulla eu ligula. Nam ultricies mollis nulla, sedlaoreet leo convallis ac. Mauris nisl risus, tincidunt ac diam aliquet,convallis pellentesque nisi. Nam sit amet libero at odio malesuada ultricies avitae dolor. Cras in viverra felis, non consequat quam. Praesent a orci enim.Vivamus porttitor nisi at nisl egestas iaculis. Nullam commodo eget duisollicitudin sagittis. Duis id nibh mollis, hendrerit metus consectetur,ullamcorper risus. Morbi elementum ultrices nunc, quis porta nisi ornare sitamet.
                              <br />
                          <br />
                              Etiam tincidunt orci in nisi aliquam placerat. Aliquam finibus in sem utvehicula. Morbi eget consectetur leo. Quisque consectetur lectus eros, sedsodales libero ornare cursus. Etiam elementum ut dolor eget hendrerit.Suspendisse eu lacus eu eros lacinia feugiat sit amet non purus.
                              <br />
                          <br />
                              Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallis enim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, eget auctor sapien varius.
                          </p>
                        <br />
                        <p className="font-weight-bold">Elementum Ultrices</p>
                        <Table borderless>
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td colSpan="2">Larry the Bird</td>
                              <td>@twitter</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        {
                          commentWithLikesData.map((item, index) => {
                            return (<CommentWithLikes data={item} key={item.key}></CommentWithLikes>);
                          })
                        }
                        <InputGroup className="comment-contaiener">
                          <Input placeholder={messages["pages.addComment"]} />
                          <InputGroupAddon addonType="append">
                            <Button color="primary">
                              <span className="d-inline-block">{messages["pages.send"]}</span> <i className="simple-icon-arrow-right ml-2"></i>
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>

              </TabContent>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DetailsPages);
