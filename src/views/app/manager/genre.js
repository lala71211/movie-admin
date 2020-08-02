import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import ListPageHeading from "../../../containers/manager/ListPageHeading";
import DataListView from "../../../containers/manager/DataListView";
import ContextMenuContainer from "../../../containers/manager/ContextMenuContainer";
import AddNewGenreModal from "../../../containers/manager/AddNewGenreModal";
import EditGenreModal from "../../../containers/manager/EditGenreModal";
import { NotificationManager } from "../../../components/common/react-notifications";

import { connect } from "react-redux";
import { getListGenres, addGenre, editGenre } from "../../../redux/genre/actions"

function collect(props) {
  return { data: props.data };
}

class GenrePage extends Component {

  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {

      selectedPageSize: 10,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "title", label: "Product Name" },
      dropdownSplitOpen: false,
      addModalOpen: false,
      editModalOpen: false,
      search: "",
      selectedItems: [],
      lastChecked: null,
      genreForm: {
        id: 0,
        name: ""
      },
      // isLoading: false,
      // items: [],
      // error: ''
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
  componentDidUpdate(previousProps) {
    if (previousProps.data !== this.props.data) {
      this.dataListRender();
    }

  }
  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  toggleModal = () => {
    this.setState({
      addModalOpen: !this.state.addModalOpen
    });
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

    let { selectedItems, genreForm } = this.state;
    let { genres } = this.props;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    let selectGenre = genres.filter(x => x.id === id);
    genreForm.id = selectGenre[0].id;
    genreForm.name = selectGenre[0].name;
    this.setState({
      selectedItems, genreForm
    });

    if (event.shiftKey) {

      var start = this.getIndex(id, genres, "id");
      var end = this.getIndex(this.state.lastChecked, genres, "id");
      genres = genres.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...genres.map(item => {
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
    const { selectedOrderOption, search } = this.state;
    this.setState({
      selectedItems: []
    });
    this.props.getListGenres(selectedOrderOption, search)
    console.log("Render")
  }

  toggleEditModal = () => {
    this.setState({ editModalOpen: !this.state.editModalOpen })
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      genreForm: { ...prevState.genreForm, [name]: value }
    }
    ))
  }

  handleAddSubmit = e => {
    const { genreForm } = this.state;
   
    this.props.addGenre(genreForm)

    setTimeout(() => { this.toggleModal() }, 100)
    setTimeout(() => { this.dataListRender() }, 100)

  }

  handleEditSubmit = e => {
    const { genreForm } = this.state;
    this.props.editGenre(genreForm)
    
    setTimeout(() => { this.toggleEditModal() }, 100)
    setTimeout(() => { this.dataListRender() }, 100)

  }

  onContextMenuClick = (e, data, target) => {

    if (data.action === "edit") {
      this.toggleEditModal();
      const { genres } = this.props;
      let selectedGenre = genres.find(item => item.id === data.data);
      this.setState({ selectedItems: [data.data], genreForm: selectedGenre })
    }
    else if (data.action === "delete") {
      console.log("onContextMenuClick - action : ", data.action);
    }

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
  createNotification = (className) => {
    let cName = className || "";

    NotificationManager.warning(
      "Chỉ được chọn 1 để sửa",
      "Thông báo",
      5000,
      null,
      null,
      cName
    );
  }

  render() {
    const {
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      addModalOpen,
      editModalOpen,
      genreForm
    } = this.state;

    const { match, genres, isLoading } = this.props;

    return isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeading
              heading="menu.genre-list"
              handleChangeSelectAll={this.handleChangeSelectAll}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              totalItemCount={0}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={0}
              endIndex={0}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={genres ? genres.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleEditModal={this.toggleEditModal}
            />
            <AddNewGenreModal
              modalOpen={addModalOpen}
              toggleModal={this.toggleModal}
              genre={genreForm}
              handleChange={this.handleChangeInput}
              handleSubmit={this.handleAddSubmit}
            />
            <EditGenreModal
              modalOpen={editModalOpen}
              toggleModal={this.toggleEditModal}
              genre={genreForm}
              handleChange={this.handleChangeInput}
              handleSubmit={this.handleEditSubmit}
            />
            <Row className="justify-content-center">
              {genres.map(genre => {
                return (
                  <DataListView
                    key={genre.id}
                    genre={genre}
                    isSelect={selectedItems.includes(genre.id)}
                    onCheckItem={this.onCheckItem}
                    collect={collect}
                  />
                );
              })}
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
const mapStateToProps = ({ genreData }) => {
  const { genres, isLoading, error } = genreData;
  // console.log(items,isLoading)
  return { genres, isLoading, error };
};

export default connect(
  mapStateToProps,
  {
    getListGenres,
    addGenre,
    editGenre,
  }
)(GenrePage);
