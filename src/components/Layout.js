import SidebarContainer from "./Sidebar/SidebarContainer.js";

export default function Layout({
  $target,
  initialState,
  onClickSpreadButton,
  onClickAddButton,
  onClickRemoveButton,
  onMouseOverAndOut,
  onDocumentClick,
  onTitleClick,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    sidebarContainer.setState({
      ...this.state,
    });
  };

  const sidebarContainer = new SidebarContainer({
    $target,
    initialState: this.state,
    onClickSpreadButton,
    onClickAddButton,
    onClickRemoveButton,
    onMouseOverAndOut,
    onDocumentClick,
    onTitleClick,
  });

  this.render = () => {
    const $pageSection = document.createElement("div");
    $pageSection.classList.add("page_content");
    $target.appendChild($pageSection);
  };

  this.render();
}
