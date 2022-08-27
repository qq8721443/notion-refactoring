import { LOGO } from "../../constants/index.js";

export default function SidebarTitle({ $target, header, onTitleClick }) {
  const $sidebarTitle = document.createElement("div");
  $sidebarTitle.classList.add("sidebar-title");
  $sidebarTitle.style.cursor = "pointer";
  $target.appendChild($sidebarTitle);

  this.render = () => {
    $sidebarTitle.innerHTML = `
            ${LOGO}
            <div>${header}</div>
        `;
  };

  this.render();

  $sidebarTitle.addEventListener("click", onTitleClick);
}
