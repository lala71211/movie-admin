import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import Pagination from "../../../../containers/manager/Pagination";
import ContextMenuContainer from "../../../../containers/manager/ContextMenuContainer";
import ListPageHeading from "../../../../containers/manager/ListPageHeading";
import ImageListView from "../../../../containers/manager/ImageListView";
import ThumbListView from "../../../../containers/manager/ThumbListView";
import AddNewModal from "../../../../containers/manager/AddNewModal";

import { connect } from "react-redux";
import { getListMovies, addMovie, editMovie } from "../../../../redux/movie/actions"

function collect(props) {
  return { data: props.data };
}

class MovieListPages extends Component {

  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');

    this.state = {
      displayMode: "imagelist",

      selectedPageSize: 8,
      orderOptions: [
        { column: "title", label: "Tên Phim" },
        { column: "genre", label: "Thể loại" },
        { column: "view", label: "Lượt xem" },
        { column: "release_date", label: "Công chiếu" },
      ],
      pageSizes: [8, 12, 24],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "title", label: "Tên phim" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
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
      }
    };
  }

  componentDidMount() {
    this.dataListRender();
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  toggleModal = () => {
    this.props.history.push(`new-movie`)
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };

  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let { selectedItems, movieForm } = this.state;
    let { items } = this.props;

    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }

    let selectMovie = items.filter(x => x.id === id);
    movieForm.id = selectMovie[0].id;
    movieForm.title = selectMovie[0].title;
    movieForm.quality = selectMovie[0].quality;
    movieForm.imdb = selectMovie[0].imdb;
    movieForm.runtime = selectMovie[0].runtime;
    movieForm.release_date = selectMovie[0].release_date;
    movieForm.overview = selectMovie[0].overview;
    movieForm.popularity = selectMovie[0].popularity;
    movieForm.language = selectMovie[0].language;
    movieForm.poster = selectMovie[0].poster;
    movieForm.view = selectMovie[0].view;
    movieForm.nation = selectMovie[0].nation;
    movieForm.adult = selectMovie[0].adult;
    movieForm.visible = selectMovie[0].visible;
    movieForm.genre = selectMovie[0].genre;
    movieForm.characters = selectMovie[0].characters;
    movieForm.episode = selectMovie[0].episode;

    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  };

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    this.setState({
      selectedItems: [],
    });
    this.props.getListMovies(selectedPageSize,
      currentPage,
      selectedOrderOption,
      search)
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    const {
      currentPage,
      displayMode,
      selectedPageSize,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      categories
    } = this.state;
    const { match, totalItemCount, items, isLoading, totalPages } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeading
              heading="menu.movie-list"
              displayMode={displayMode}
              changeDisplayMode={this.changeDisplayMode}
              handleChangeSelectAll={this.handleChangeSelectAll}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
            />
            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              categories={categories}
            />
            <Row>
              {items.map(movie => {

                if (displayMode === "imagelist") {
                  return (
                    <ImageListView
                      key={movie.id}
                      movie={movie}
                      isSelect={selectedItems.includes(movie.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else if (displayMode === "thumblist") {
                  return (
                    <ThumbListView
                      key={movie.id}
                      movie={movie}
                      isSelect={selectedItems.includes(movie.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                }
                else
                  return null;
              })}
              <Pagination
                currentPage={currentPage}
                totalPage={totalPages}
                onChangePage={i => this.onChangePage(i)}
              />
              <ContextMenuContainer
                onContextMenuClick={this.onContextMenuClick}
                onContextMenu={this.onContextMenu}
              />
            </Row>
          </div>
        </Fragment>
      );
  }
}
const mapStateToProps = ({ movieData }) => {
  const { items, isLoading, error,
    totalPages, totalItemCount } = movieData;
  // console.log(items,isLoading)
  return { items, isLoading, error, totalPages, totalItemCount };
};

export default connect(
  mapStateToProps, {
  getListMovies,
  addMovie,
  editMovie
}
)(MovieListPages);
