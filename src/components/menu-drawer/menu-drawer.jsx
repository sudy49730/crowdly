import { useState } from "react";
import { Drawer } from "rsuite";
import { MenuItems } from "../menu-items/menu-items";
import "./menu-drawer.scss";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <span className="menu-drawer-container">
      <i className="uil uil-align-center-alt icon" onClick={openDrawer} />
      <Drawer
        onClose={closeDrawer}
        className="menu-drawer"
        size="xs"
        placement="right"
        style={{ width: "68%" }}
        open={open}
      >
        <Drawer.Header>
          <Drawer.Title>Navigation Menu</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <MenuItems />
        </Drawer.Body>
      </Drawer>
    </span>
  );
};

export { MenuDrawer };
