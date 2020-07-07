import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";

import { serverPath } from "../../../../constants/defaultValues";

import Pagination from "../../../../containers/manager/Pagination";
import ContextMenuContainer from "../../../../containers/manager/ContextMenuContainer";
import ListPageHeading from "../../../../containers/manager/ListPageHeading";
import ImageListView from "../../../../containers/manager/ImageActorListView";
import ThumbListView from "../../../../containers/manager/ThumbActorListView";
import AddNewModal from "../../../../containers/manager/AddNewActorModal";
import EditActorModal from "../../../../containers/manager/EditActorModal";

function collect(props) {
  return { data: props.data };
}
// const apiUrl = serverPath + "/api/actor/";
const apiUrl = serverPath + "/api/actors/";

// var handleImage = { 
//   ,addedfile: (file) =>  console.log(file)
//   // console.log(file) 
// };

class Actor extends Component {

  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');

    this.state = {
      displayMode: "imagelist",
      dropzoneconfig: { addedfile: (file) => this.handleImage(file) },
      selectedPageSize: 8,
      orderOptions: [
        { column: "name", label: "Tên diễn viên" },
        { column: "title", label: "Tên phim" },
        // { column: "view", label: "Lượt xem" },
        // { column: "release_date", label: "Công chiếu" },
      ],
      pageSizes: [8, 12, 24],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "name", label: "Tên diễn viên" },
      dropdownSplitOpen: false,
      modalOpen: false,
      editModalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      actorForm: {
        id: 0,
        name: "",
        nation: "",
        image: null,
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
      modalOpen: !this.state.modalOpen
    });
  };
  toggleEditModal = () => {
    this.setState({
      editModalOpen: !this.state.editModalOpen
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

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage - 1}&orderBy=${
        selectedOrderOption.column
        }&search=${search}`
      )
      .then(res => {
        // console.log(res);
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.totalPages,
          items: data.content,
          selectedItems: [],
          totalItemCount: data.totalElements,
          isLoading: true
        });
        // console.log(data);
      });
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      actorForm: { ...prevState.actorForm, [name]: value }
    }
    ))
  }
  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      actorForm: { ...prevState.actorForm,[name]: value }
    }))
    // console.log(this.state.actorForm)
  }

  handleImage = file => {
    // addedfile: (file) =>  console.log(file)
    this.setState({ image: file })
    // console.log(this.state.image)
  };

  handleAddSubmit = e => {
    const { actorForm, image } = this.state;
    // console.log("submit"form
    const formSubmit = new FormData();
    formSubmit.append('id', 0);
    formSubmit.append('name', actorForm.name);
    formSubmit.append('nation', actorForm.nation.label);
    formSubmit.append('image', image);
    axios
      .post(`${apiUrl}`, formSubmit)
      .then(res => {
        this.toggleModal();
        this.dataListRender();
        console.log("success")
      })
      .catch(error => console.log(error.response))
  }

  handleEditSubmit = e => {
    const { actorForm } = this.state;
    axios
      .put(`${apiUrl}/${actorForm.id}`, actorForm)
      .then(res => {
        this.toggleEditModal();
        this.dataListRender();
      })
      .catch(error => console.log(error.response))
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
    console.log(clickedProductId)
    return true;
  };

  render() {
    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      editModalOpen,
      categories,
      actorForm,
      dropzoneconfig,
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeading
              heading="menu.actor-list"
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
              toggleEditModal={this.toggleEditModal}
            />
            <AddNewModal
              modalOpen={modalOpen}
              actor={actorForm}
              toggleModal={this.toggleModal}
              categories={categories}
              handleChange={this.handleChangeInput}
              handleSubmit={this.handleAddSubmit}
              handleImage={dropzoneconfig}
              handleChangeSelect={this.handleChangeSelect}
            />
            <EditActorModal
              modalOpen={editModalOpen}
              toggleEditModal={this.toggleEditModal}
              actor={actorForm.id}
              handleChange={this.handleChangeInput}
              handleSubmit={this.handleEditSubmit}
              handleImage={dropzoneconfig}
              handleChangeSelect={this.handleChangeSelect}
            />
            <Row>
              {this.state.items.map(actor => {
                // console.log(actor);
                if (this.state.displayMode === "imagelist") {
                  return (
                    <ImageListView
                      key={actor.id}
                      actor={actor}
                      isSelect={this.state.selectedItems.includes(actor.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else if (this.state.displayMode === "thumblist") {
                  return (
                    <ThumbListView
                      key={actor.id}
                      actor={actor}
                      isSelect={this.state.selectedItems.includes(actor.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else
                  return null;
              })}
              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
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
export default Actor;
