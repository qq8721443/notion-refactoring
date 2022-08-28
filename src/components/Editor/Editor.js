import { QUERY_NAME_CONTENT, CLASS_HIDDEN } from "../../constants/index.js";

export default function Editor({ $target, initialState, onChange }) {
  const $Editor = document.createElement("div");
  $Editor.classList.add("editor");
  $target.appendChild($Editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $Editor.querySelector(QUERY_NAME_CONTENT).value = this.state.content;
  };

  this.render = () => {
    $Editor.innerHTML = `
        <textarea name="content" placeholder="내용을 작성해주세요!"></textarea>
    `;
  };

  this.render();

  $Editor.addEventListener("input", onChange);
}
