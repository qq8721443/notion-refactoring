import { QUERY_NAME_TITLE } from "../../constants/index.js";

export default function RichEditorTitle({ $target, initialState, onChange }) {
  const $title = document.createElement("div");
  $title.classList.add("rich-editor-title-container");
  $target.appendChild($title);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $title.querySelector("[name=title]").textContent = this.state.title;
  };

  this.render = () => {
    $title.innerHTML = `
      <div class="rich-editor-title-container-2">
        <div class="rich-editor-title">
          <div name="title" contenteditable placeholder="Untitled"></div>
        </div>
      </div>
    `;
  };

  this.render();

  $title.querySelector(QUERY_NAME_TITLE).addEventListener("input", onChange);
}
