import DocumentsList from "./DocumentsList.js";
import NewButton from "./NewButton.js";
import SidebarTitle from "./SidebarTitle.js";

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
}
