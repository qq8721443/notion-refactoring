import DocumentsList from "./DocumentsList.js";
import NewButton from "./NewButton.js";
import SidebarTitle from "./SidebarTitle.js";
import throttle from "../../utils/throttle.js";
import { getStorage, setStorage } from "../../utils/storage.js";

export default function SidebarContainer({
  $target,
  initialState,
  onClickSpreadButton,
  onClickAddButton,
  onClickRootAddButton,
  onClickRemoveButton,
  onMouseOverAndOut,
  onDocumentClick,
  onTitleClick,
}) {
  const $container = document.createElement("div");
  $container.classList.add("sidebar-container");

  const $side = document.createElement("div");
  $side.classList.add("side");
  $container.appendChild($side);

  $target.appendChild($container);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentsList.setState({
      ...this.state,
    });
  };

  new SidebarTitle({
    $target: $container,
    header: "JEONGKI's notion",
    onTitleClick,
  });

  const documentsList = new DocumentsList({
    $target: $container,
    initialState: this.state,
    onClickSpreadButton,
    onClickAddButton,
    onClickRemoveButton,
    onMouseOverAndOut,
    onDocumentClick,
  });

  new NewButton({
    $target: $container,
    text: "New Document",
    className: "new-button",
    onClick: onClickRootAddButton,
  });

  this.render = () => {};

  const storedWidth = getStorage("sidebar-width");
  $container.style.width = `${storedWidth}px`;

  let mouseX = 0;

  let width = 0;

  const handleMouseDown = (e) => {
    mouseX = e.clientX;

    const styles = window.getComputedStyle($container);
    width = parseInt(styles.width, 10);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const dx = e.clientX - mouseX;

    if (width + dx > window.innerWidth - 940) {
      $container.style.width = `${window.innerWidth - 940}px`;
      setStorage("sidebar-width", `${window.innerWidth - 940}`);
    } else {
      $container.style.width = `${width + dx}px`;
      setStorage("sidebar-width", `${width + dx}`);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  $side.addEventListener("mousedown", handleMouseDown);
}
