import DocumentsList from "./DocumentsList.js";
import NewButton from "./NewButton.js";
import SidebarTitle from "./SidebarTitle.js";
import throttle from "../../utils/throttle.js";

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
  $side.setAttribute("draggable", true);
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

  const handleDragStart = (e) => {
    // e.preventDefault();
    const img = new Image();
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e) => {
    console.log($container.getBoundingClientRect().width);
    $container.style.width = `${
      $container.getBoundingClientRect().width + e.offsetX
    }px`;
  };

  $side.addEventListener("dragstart", handleDragStart);
  window.addEventListener("drag", throttle(handleDrag));
}
