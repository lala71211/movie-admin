import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import Pagination from "../../../../containers/manager/Pagination";
import ContextMenuContainer from "../../../../containers/manager/ContextMenuContainer";
import ListPageHeading from "../../../../containers/manager/ListUserPageHeading";
import ImageListView from "../../../../containers/manager/ImageUserListView";
import ThumbListView from "../../../../containers/manager/ThumbUserListView";
import FavoriteModal from "../../../../containers/manager/FavoriteModal";
import EditUserRoleModal from "../../../../containers/manager/EditUserRoleModal";
import { connect } from "react-redux";
import { getListUsers, getFavoriteListByUserID, editUser } from "../../../../redux/user/actions";

function collect(props) {
  return { data: props.data };
}


class UserListPages extends Component {

  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');

    this.state = {
      displayMode: "thumblist",

      selectedPageSize: 8,
      orderOptions: [
        { column: "id,asc", label: "Tăng dần" },
        { column: "id,desc", label: "Giảm dần" },
      ],
      pageSizes: [8, 12, 24],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "id,asc", label: "Tăng dần" },
      dropdownSplitOpen: false,
      modalOpen: false,
      modalEditOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      userForm: {
        id: 0,
        email: "",
        name: "",
        username: "",
        provider: "",
        image_url: null,
        delete_flag: false,
        roles: [{
          id: 0,
          name: "",
        },
        {
          id: 1,
          name: "",
        },
        ],
      },
      selectUserId: 0
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
      modalEditOpen: !this.state.modalEditOpen
    });
  }

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

    let { selectedItems, userForm } = this.state;
    let { items } = this.props;

    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }

    let selectUser = items.filter(x => x.id === id);
    userForm.id = selectUser[0].id;
    userForm.email = selectUser[0].email;
    userForm.name = selectUser[0].name;
    userForm.username = selectUser[0].username;
    userForm.provider = selectUser[0].provider;
    userForm.image_url = selectUser[0].image_url;
    userForm.delete_flag = selectUser[0].delete_flag;
    userForm.roles = selectUser[0].roles;

    this.setState({
      selectedItems,
      selectUserId: selectUser[0].id
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
    this.props.getFavoriteListByUserID(selectUser[0].id)
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

  handleEditSubmit = e => {
    const { userForm } = this.state;
    let roles = [];
    userForm.roles.map(item => roles.push({
      id: item.key,
      name: item.value
    }))
    userForm.roles = roles;
    this.props.editUser(userForm)
    setTimeout(() => { this.toggleEditModal() }, 500)
    setTimeout(() => { this.dataListRender() }, 500)
  }

  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userForm: { ...prevState.userForm, [name]: value }
    }))
    // console.log(this.state.actorForm)
  }
  deleteFlag = e => {
    const { userForm } = this.state;
    userForm.delete_flag = !userForm.delete_flag;
    this.props.editUser(userForm)
    setTimeout(() => { this.dataListRender() }, 500)
  }
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
    this.props.getListUsers(selectedPageSize,
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
    let selectedItems = this.state.selectedItems;
    if (data.action === "edit" && selectedItems.length > 1) {
      console.log("lỗi nè")
      // this.createNotification("filled");
    }
    else if (data.action === "edit" && selectedItems.length === 1) {
      // console.log("abc")
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
      userForm,
      modalOpen,
      modalEditOpen
    } = this.state;
    const { match, totalItemCount, items, isLoading, totalPages, favorite } = this.props;

    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeading
              heading="menu.user-list"
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
            <FavoriteModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              user={userForm}
              favorite={favorite}
            />
            <EditUserRoleModal
              modalOpen={modalEditOpen}
              toggleEditModal={this.toggleEditModal}
              user={userForm}
              handleSubmit={this.handleEditSubmit}
              handleChangeSelect={this.handleChangeSelect}
            />
            <Row>
              {items.map(user => {

                if (displayMode === "imagelist") {
                  return (
                    <ImageListView
                      key={user.id}
                      user={user}
                      isSelect={selectedItems.includes(user.id)}
                      collect={collect}
                      onCheckItem={this.onCheckItem}
                    />
                  );
                } else if (displayMode === "thumblist") {
                  return (
                    <ThumbListView
                      key={user.id}
                      user={user}
                      isSelect={selectedItems.includes(user.id)}
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
const mapStateToProps = ({ userData }) => {
  const { items, isLoading, error,
    totalPages, totalItemCount, favorite } = userData;
  // console.log(items,isLoading)
  return { items, isLoading, error, totalPages, totalItemCount, favorite };
};

export default connect(
  mapStateToProps, {
  getListUsers,
  editUser,
  getFavoriteListByUserID
}
)(UserListPages);
