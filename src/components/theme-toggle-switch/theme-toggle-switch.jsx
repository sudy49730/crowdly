import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "rsuite";
import { TOGGLE_THEME } from "../../state-management/actions";

const ThemeToggleSwitch = () => {
  const currentTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = (e) => {
    dispatch(TOGGLE_THEME());
  };

  return (
    <Toggle
      checked={currentTheme === "light" ? false : true}
      onChange={toggleTheme}
      unCheckedChildren={<i className="uil uil-wind-moon"></i>}
      checkedChildren={<i className="uil uil-sun"></i>}
    />
  );
};
export { ThemeToggleSwitch };
