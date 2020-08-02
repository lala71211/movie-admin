import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: "copy" }}>
        <i className="simple-icon-docs" /> <span>Copy</span>
      </MenuItem> */}
      <MenuItem onClick={onContextMenuClick} data={{ action: "edit" }}>
        <i className="simple-icon-note" /> <span>Sửa</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
        <i className="simple-icon-trash" /> <span>Xóa hoặc đổi trạng thái</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
