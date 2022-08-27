import { push } from "../../router.js";

export default function Breadcrumb({ $target, initialState }) {
  const $breadcrumb = document.createElement("div");
  $breadcrumb.classList.add("breadcrumb");
  $target.appendChild($breadcrumb);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const makePath = () => {
    const path = [];
    if (this.state.id) {
      let currentNode = document.querySelector(
        `li[data-id='${this.state.id}']`
      );
      while (currentNode !== null) {
        const obj = {};
        obj["id"] = currentNode.dataset.id;
        obj["title"] = currentNode.querySelector(".title").innerText;
        path.push(obj);
        currentNode = currentNode.parentElement.closest("li[data-id]");
      }
      return path.reverse();
    }
  };

  this.render = () => {
    $breadcrumb.innerHTML = `
            ${
              this.state.id
                ? makePath()
                    .map(
                      (item) => `
                        <div class="breadcrumb-item" data-id=${item.id}>
                            <div class="breadcrumb-item-title">${item.title}</div>
                        </div>
                    `
                    )
                    .join(" / ")
                : ""
            }
        `;
  };

  this.render();

  $breadcrumb.addEventListener("click", (e) => {
    const { target } = e;
    push(`/documents/${target.closest("[data-id]").dataset.id}`);
  });
}
