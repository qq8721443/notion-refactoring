import {
  CLASS_HIDDEN,
  DOCUMENT_ICON,
  RIGHT_ARROW,
  DOWN_ARROW,
} from "../../constants/index.js";

export default function DocumentsList({
  $target,
  initialState,
  onClickSpreadButton,
  onClickAddButton,
  onMouseOverAndOut,
  onDocumentClick,
  onClickRemoveButton,
}) {
  const $documentsList = document.createElement("ul");
  $documentsList.classList.add("notion-sidebar");
  $target.appendChild($documentsList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const setDocumentTree = (documents) => {
    return documents
      .map(
        (document) => `
        <li class="root-document" data-id=${document.id}>
        <div class="hover-area"><div role="button" class="spread-button ${
          this.state.openDocumentsList.includes(document.id) ? "open" : ""
        }">${
          this.state.openDocumentsList.includes(document.id)
            ? DOWN_ARROW
            : RIGHT_ARROW
        }
        </div>
        ${DOCUMENT_ICON}
        <div class="title ${this.state.id === document.id ? "selected" : ""}">${
          this.state.id === document.id
            ? this.state.title === ""
              ? "Untitled"
              : this.state.title
            : document.title === ""
            ? "Untitled"
            : document.title
        }</div><button class="button add-button hidden">+</button><button class="button remove-button hidden">-</button></div>
        ${
          document.documents.length > 0
            ? `<ul class="child ${
                this.state.openDocumentsList.includes(document.id)
                  ? ""
                  : CLASS_HIDDEN
              }">${setDocumentTree(document.documents)}</ul>`
            : `<ul class="child-none ${
                this.state.openDocumentsList.includes(document.id)
                  ? ""
                  : CLASS_HIDDEN
              }">하위 페이지가 없습니다.</ul>`
        }
        </li>
    `
      )
      .join("");
  };

  this.render = () => {
    $documentsList.innerHTML = setDocumentTree(this.state.documents);
  };

  this.render();

  $documentsList.addEventListener("click", onClickSpreadButton);
  $documentsList.addEventListener("click", onClickAddButton);
  $documentsList.addEventListener("click", onClickRemoveButton);
  $documentsList.addEventListener("click", onDocumentClick);
  $documentsList.addEventListener("mouseover", onMouseOverAndOut);
  $documentsList.addEventListener("mouseout", onMouseOverAndOut);
}
