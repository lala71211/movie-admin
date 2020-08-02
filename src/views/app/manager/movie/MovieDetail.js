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
// import Rating from "../../../../components/common/Rating";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

// import { injectIntl } from "react-intl";
import SmallLineCharts from "../../../../containers/dashboards/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../../containers/dashboards/WebsiteVisitsChartCard";
import NewComments from "../../../../containers/dashboards/NewComments";
import NewReviews from "../../../../containers/dashboards/NewReview";
import FormikEditMovie from "../../../../containers/form-validations/FormikEditMovie";

import { connect } from "react-redux";
import { getMovieByID, addMovie, editMovie, deleteMovie } from "../../../../redux/movie/actions";
import { getListComments } from "../../../../redux/comment/actions";
import { getListReviews } from "../../../../redux/review/actions"
import { FIREBASE_PATH, DEFAULT_IMAGE } from "../../../../constants/defaultValues";
import { storage } from "../../../../helpers/Firebase";

var id = 0;
class DetailsPages extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.movieStatus = this.movieStatus.bind(this);
    this.state = {
      activeFirstTab: "1",
      movieForm: {
        id: 0,
        title: "",
        quality: "",
        imdb: 0,
        runtime: 0,
        release_date: null,
        overview: "",
        popularity: 0,
        language: "",
        poster: null,
        view: 0,
        nation: "",
        adult: 0,
        visible: false,
        genres: [{
          id: 0,
          name: "",
        },
        {
          id: 1,
          name: "",
        },
        ],
        characters: [],
        episodes: []
      },
      image: null,
      commentForm: {},

    };
    // console.log(this.props)
  }

  componentDidMount() {
    this.dataListRender();
    this.getImageUrl();
  }


  dataListRender() {
    id = parseInt(this.props.match.params.id);
    this.props.getMovieByID(id);
    this.props.getListComments(6, 0, id, -1);
    this.props.getListReviews(6, 0, id, -1);
  }
  movieStatus() {
    let id = this.props.item.id;
    let status = this.props.item.visible;
    this.props.deleteMovie(id, !status)
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  async getImageUrl() {
    let fileName = this.props.item.poster
    if (fileName == null || fileName === '') {
      this.setState({ image: DEFAULT_IMAGE });
    } else {
      let pathReference = storage.refFromURL(`${FIREBASE_PATH}/poster`);
      let starsRef = pathReference.child(fileName);

      return starsRef
        .getDownloadURL()
        .then((url) => {
          // let img = document.querySelector(".avatar");
          this.setState({ image: url });
        })
        .catch((error) => {
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
  }
  render() {
    const { image } = this.state;
    const { item, isLoading, comments, reviews, error } = this.props;
    if (error !== "") {
      console.log(error);
    }
    return isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1>{item.title}</h1>
              <div className="text-zero top-right-button-container">
                <UncontrolledDropdown>
                  <Button
                    caret
                    color="primary"
                    size="lg"
                    outline
                    className="top-right-button top-right-button-single"
                    onClick={() => this.movieStatus()}
                  >
                    <IntlMessages id="pages.change-status" />
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
                        <div className="position-absolute ">
                        </div>
                        <img
                          src={image}
                          alt="Detail"
                          className="card-img-top"
                          style={{ height: "30%", width: "30%", marginLeft: "10px", marginTop: "10px" }}
                        />

                        <CardBody>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.overview" />
                          </p>
                          <p className="mb-3">
                            {item.overview}
                          </p>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.imdb" />
                          </p>
                          <div className="mb-3">
                            {/* <Rating total={5} rating={5} interactive={false} /> */}
                            {item.imdb}
                          </div>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.releaseyear" />
                          </p>
                          <p className="mb-3">{item.release_date}</p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.genres" />
                          </p>
                          <div className="mb-3">
                            <p className="d-sm-inline-block mb-1">
                              {/* {item.genres.map(x => {
                                return ( 
                                  <Badge color="outline-secondary mb-1 mr-1" pill>
                                    {x.name} 
                                  </Badge>
                                )
                              })}  */}
                              {item.genres === undefined ? (
                                null
                              ) : (item.genres.map(x => {
                                return (
                                  <Badge color="outline-secondary mb-1 mr-1" pill>
                                    {x.name}
                                  </Badge>
                                )
                              }))}
                            </p>
                          </div>

                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.quality" />
                          </p>
                          <p>{item.quality}</p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.language" />
                          </p>
                          <p>{item.language}</p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.nation" />
                          </p>
                          <p>{item.nation}</p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.adult" />
                          </p>
                          <p>{item.adult}</p>
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.visible" />
                          </p>
                          {item.visible === true ? (
                            <p>True</p>
                          ) : (
                              <p>False</p>)
                          }
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
                  <FormikEditMovie movie={item} />
                </TabPane>
                <TabPane tabId="3">
                  <NewComments className="mb-4" displayRate={false} comment={comments} />
                </TabPane>
                <TabPane tabId="4">
                  <NewReviews className="mb-4" displayRate={true} reviews={reviews} />
                </TabPane>
              </TabContent>
            </Colxx>
          </Row>
        </Fragment>
      );
  }
}
const mapStateToProps = ({ movieData, commentData, reviewData }) => {
  const { item, isLoading, error } = movieData;
  const { comments } = commentData;
  const { reviews } = reviewData;
  return { item, isLoading, error, comments, reviews };
};

export default connect(
  mapStateToProps, {
  getMovieByID,
  addMovie,
  editMovie,
  deleteMovie,
  getListComments,
  getListReviews,
}
)(DetailsPages);