import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import Pagination from "../../../../containers/manager/Pagination";
import ContextMenuContainer from "../../../../containers/manager/ContextMenuContainer";

import ListPageHeading from "../../../../containers/manager/ListPageHeading";
import ImageListView from "../../../../containers/manager/ImageActorListView";
import ThumbListView from "../../../../containers/manager/ThumbActorListView";
import AddNewModal from "../../../../containers/manager/AddNewActorModal";
import EditActorModal from "../../../../containers/manager/EditActorModal";
import { NotificationManager } from "../../../../components/common/react-notifications";


import { connect } from "react-redux";
import { getListActors, addActor, editActor, deleteActor } from "../../../../redux/actor/actions"

function collect(props) {
  return { data: props.data };
}
// const apiUrl = serverPath + "/api/actor/";


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
      },
      items: [],
      messsages: "",
      visible: false
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
    // Update actorForm , add selectedItems
    let { selectedItems, actorForm } = this.state;
    let { items } = this.props;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    let selectActor = items.filter(x => x.id === id);
    // console.log(selectActor);
    actorForm.id = selectActor[0].id;
    actorForm.name = selectActor[0].name;
    actorForm.nation = selectActor[0].nation;
    actorForm.image = selectActor[0].avatar;
    this.setState({
      selectedItems, actorForm
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
    this.props.getListActors(selectedPageSize,
      currentPage,
      selectedOrderOption,
      search);

  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      actorForm: { ...prevState.actorForm, [name]: value }
    }
    ))
  };

  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      actorForm: { ...prevState.actorForm, [name]: value }
    }))
    // console.log(this.state.actorForm)
  }

  deleteFlag = e => {
    const { actorForm } = this.state;
    let id = actorForm.id;
    this.props.deleteActor(id)
    setTimeout(() => { this.dataListRender() }, 500)
  }

  handleImage = file => {
    // addedfile: (file) =>  console.log(file)

    this.setState({ image: file })
    // console.log(this.state.image)
  };

  handleAddSubmit = e => {
    const { actorForm, image } = this.state;
    console.log("submit")
    const formSubmit = new FormData();
    formSubmit.append('id', 0);
    formSubmit.append('name', actorForm.name);
    formSubmit.append('nation', actorForm.nation.label);
    if (image !== undefined) {
      formSubmit.append('image', image);
    }

    this.props.addActor(formSubmit)
    setTimeout(() => { this.toggleModal() }, 500)
    setTimeout(() => { this.dataListRender() }, 500)
  }

  handleEditSubmit = e => {
    console.log("submit")
    const { actorForm, image } = this.state;
    console.log(image);
    const formSubmit = new FormData();
    formSubmit.append('id', actorForm.id);
    formSubmit.append('name', actorForm.name);
    formSubmit.append('nation', actorForm.nation.label);
    if (image !== undefined) {
      formSubmit.append('image', image);
    }
    this.props.editActor(actorForm.id, formSubmit)
    setTimeout(() => { this.toggleEditModal() }, 500)
    setTimeout(() => { this.dataListRender() }, 500)
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
    let selectedItems = this.state.selectedItems;
    if (data.action === "edit" && selectedItems.length > 1) {
      // console.log("lỗi nè")
      this.createNotification("filled");
    }
    else if (data.action === "edit" && selectedItems.length === 1) {
      this.toggleEditModal();
    }
    if (data.action === "delete") {
      this.deleteFlag();
    }
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
      currentPage,
      displayMode,
      selectedPageSize,
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
    const { match, totalItemCount, items, isLoading, totalPages } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    // console.log(items)
    return isLoading ? (
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
              deleteFlag={this.deleteFlag}
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
              actor={actorForm}
              handleChange={this.handleChangeInput}
              handleSubmit={this.handleEditSubmit}
              handleChangeSelect={this.handleChangeSelect}
              handleImage={dropzoneconfig}
            />
            {/* <NotificationExamples /> */}
            <Row>
              {items.map(actor => {
                // console.log(actor);
                if (displayMode === "imagelist") {
                  return (
                    <ImageListView
                      key={actor.id}
                      actor={actor}
                      isSelect={selectedItems.includes(actor.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else if (displayMode === "thumblist") {
                  return (
                    <ThumbListView
                      key={actor.id}
                      actor={actor}
                      isSelect={selectedItems.includes(actor.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else
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

const mapStateToProps = ({ actorData }) => {
  const { items, isLoading, error, totalPages,
    totalItemCount } = actorData;
  // console.log(items,isLoading)
  return { items, isLoading, error, totalPages, totalItemCount };
};

export default connect(
  mapStateToProps, {
  getListActors,
  addActor,
  editActor,
  deleteActor
}
)(Actor);
