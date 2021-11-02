import addHandler from "../../common-modules/addHandler.js";
import { changeAppearance } from "../counter/counter.js";

const handleRadioChange = ( e ) => {
  changeAppearance( e.currentTarget, "toggle-button_off");
}

addHandler(
  document.querySelectorAll(".toggle-button"),
  handleRadioChange,
  "change"
);