import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";

import { serverPath } from "../../../constants/defaultValues";

import ListPageHeading from "../../../containers/manager/ListPageHeading";
import DataListView from "../../../containers/manager/DataListView";
import ContextMenuContainer from "../../../containers/manager/ContextMenuContainer";
import AddNewGenreModal from "../../../containers/manager/AddNewGenreModal";
import EditGenreModal from "../../../containers/manager/EditGenreModal";

function collect(props) {
  return { data: props.data };
}

const apiUrl = serverPath + "/api/genre";

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
      isLoading: false,
      genreForm: {
        id: 0,
        name: ""
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

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
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

  async dataListRender() {
    const {

      selectedOrderOption,
      search
    } = this.state;

    const response = await axios
      .get(
        `${apiUrl}/?orderBy=${selectedOrderOption.column}&search=${search}`
      )

    const { data } = response;
    // console.log(response);
    this.setState({
      items: data.result,
      selectedItems: [],
      isLoading: true
    });
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

    axios
      .post(`${apiUrl}/`, genreForm)
      .then(res => {
        this.toggleModal();
        this.dataListRender();
      })
      .catch(error => console.log(error.response))
  }

  handleEditSubmit = e => {
    const { genreForm } = this.state;
    axios
      .put(`${apiUrl}/${genreForm.id}`, genreForm)
      .then(res => {
        this.toggleEditModal();
        this.dataListRender();
      })
      .catch(error => console.log(error.response))
  }

  onContextMenuClick = (e, data, target) => {

    if (data.action === "edit") {
      this.toggleEditModal();
      const { items } = this.state;
      let selectedGenre = items.find(item => item.id === data.data);
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

  render() {
    const {
      items,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      addModalOpen,
      editModalOpen,
      genreForm
    } = this.state;

    const { match } = this.props;

    return !this.state.isLoading ? (
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
              itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
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
              {this.state.items.map(genre => {
                return (
                  <DataListView
                    key={genre.id}
                    genre={genre}
                    isSelect={this.state.selectedItems.includes(genre.id)}
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
export default GenrePage;
