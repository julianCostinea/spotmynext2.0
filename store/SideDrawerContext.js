import { createContext, useState } from "react";

const SideDrawerContext = createContext({
  showMenu: false,
  showBackdrop: false,
  hideSideDrawer: () => {},
  showSideDrawer: () => {},
  showBackdropHandler: () => {},
  hideBackdropHandler:()=>{},
  toggleSideDrawer: () => {},
});

export function SideDrawerContextProvider(props) {
  const [showMenu, setShowMenu] = useState();
  const [showBackdrop, setShowBackdrop] = useState();

  function showMenuHandler() {
    setShowMenu(true);
    setShowBackdrop(true);
  }
  function hideMenuHandler() {
    setShowMenu(false);
    setShowBackdrop(false);
    const drawerToggle = document.querySelector("#DrawerToggle");
    drawerToggle.checked = false;
  }
  function showBackdropHandler() {
    setShowBackdrop(true);
    document.body.style.overflow = "hidden";
  }
  function hideBackdropHandler(){
    setShowBackdrop(false);
    document.body.style.overflow = "auto";
  }
  function sideDrawerToggleHandler() {
    setShowMenu(!showMenu);
    setShowBackdrop(!showBackdrop);
  }

  const context = {
    showMenu: showMenu,
    showBackdrop: showBackdrop,
    hideSideDrawer: hideMenuHandler,
    showSideDrawer: showMenuHandler,
    showBackdropHandler: showBackdropHandler,
    hideBackdropHandler: hideBackdropHandler,
    toggleSideDrawer: sideDrawerToggleHandler,
  };
  return (
    <SideDrawerContext.Provider value={context}>
      {props.children}
    </SideDrawerContext.Provider>
  );
}

export default SideDrawerContext;
