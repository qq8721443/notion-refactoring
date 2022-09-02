import {
  getDocuments,
  getOneDocument,
  setNewDocument,
  modifyDocument,
  removeDocument,
} from "./api/index.js";
import {
  QUERY_HOVER_AREA,
  QUERY_ADD_BUTTON,
  QUERY_REMOVE_BUTTON,
  CLASS_HIDDEN,
  CLASS_HOVER_AREA,
} from "./constants/index.js";
import { initRouter, push } from "./router.js";
import Layout from "./components/Layout.js";
import SavingIndicator from "./components/SavingIndicator.js";
import HomePage from "./pages/HomePage.js";
import EditPage from "./pages/EditPage.js";

export default function App({
  $target,
  initialState = {
    documents: [],
    openDocumentsList: [],
    id: "",
    title: "",
    content: "",
    isSaving: false,
  },
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    layout.setState({
      ...this.state,
    });

    editPage.setState({
      ...this.state,
    });

    homePage.setState({
      ...this.state,
    });

    savingIndicator.setState({
      ...this.state,
    });
  };

  const layout = new Layout({
    $target,
    initialState: {
      ...this.state,
    },
    onClickSpreadButton: (e) => {
      const { target } = e;
      const closestLi = target.closest("li");
      const closestSpreadButton = target.closest("div.spread-button");
      const childUl = closestLi && closestLi.querySelector("ul");
      const allchildUl = childUl && childUl.querySelectorAll("ul");
      if (
        closestSpreadButton &&
        closestSpreadButton.classList.contains("spread-button")
      ) {
        closestSpreadButton.classList.toggle("open");
        if (closestSpreadButton.classList.contains("open")) {
          this.setState({
            ...this.state,
            openDocumentsList: [
              ...this.state.openDocumentsList,
              parseInt(closestLi.dataset.id),
            ],
          });
        } else {
          this.setState({
            ...this.state,
            openDocumentsList: this.state.openDocumentsList.filter(
              (item) => item !== parseInt(closestLi.dataset.id)
            ),
          });
        }
        if (childUl) {
          allchildUl.forEach((ul) => {
            ul.classList.add(CLASS_HIDDEN);
          });
          childUl.classList.toggle(CLASS_HIDDEN);
        }
      }
    },
    onClickRootAddButton: async (e) => {
      const newDocument = await setNewDocument(null, "");
      const documents = await getDocuments();
      push(`/documents/${newDocument.id}`);
      this.setState({
        ...this.state,
        documents,
        id: newDocument.id,
        title: newDocument.title,
      });
    },
    onClickAddButton: async (e) => {
      const { target } = e;
      if (target.classList.contains("add-button")) {
        // 추가 버튼을 누를 경우
        const closestHoverDiv = target.closest(QUERY_HOVER_AREA);
        const parentId = closestHoverDiv.closest("li").dataset.id;
        const childUl = closestHoverDiv.nextSibling.nextElementSibling;
        const newDocument = await setNewDocument(parentId, "");
        // 추가 버튼 눌렀을 때 하위 문서가 자동으로 열려야 함
        // openDocumentsList에 추가하고 hidden 클래스 없애주기
        if (childUl.classList.contains(CLASS_HIDDEN)) {
          childUl.classList.remove(CLASS_HIDDEN);
        }
        push(`/documents/${newDocument.id}`);
        this.setState({
          ...this.state,
          openDocumentsList: [
            ...this.state.openDocumentsList,
            parseInt(parentId),
          ],
        });
        if (childUl.classList.contains("child")) {
          const $newLi = document.createElement("li");
          $newLi.innerHTML = `
            <li class="root-document" data-id=${newDocument.id}>
              <div class="hover-area">
                <button class="spread-button">></button>
                <button class="add-button hidden">+</button>
              </div>
              <ul class='child-none hidden'>하위 페이지가 없습니다.</ul>
            </li>`;
          childUl.appendChild($newLi);
        } else {
          childUl.classList.remove("child-none");
          childUl.classList.add("child");
          childUl.innerHTML = `
            <li class="root-document" data-id=${newDocument.id}>
              <div class="hover-area">
                <button class="spread-button">></button>
                  
                <button class="add-button hidden">+</button>
              </div>
              <ul class='child-none hidden'>하위 페이지가 없습니다.</ul>
            </li>`;
        }
        const documents = await getDocuments();
        this.setState({
          ...this.state,
          documents,
          id: newDocument.id,
          title: newDocument.title,
        });
      }
    },
    onClickRemoveButton: async (e) => {
      const { target } = e;
      if (target.classList.contains("remove-button")) {
        const closestLi = target.closest("li");
        const id = closestLi.dataset.id;
        await removeDocument(id);
        const documents = await getDocuments();
        this.setState({
          ...this.state,
          documents,
          id: "",
          title: "",
        });
        push("/");
      }
    },
    onMouseOverAndOut: (e) => {
      const { target } = e;
      const closestHoverDiv = target.closest(QUERY_HOVER_AREA);
      if (closestHoverDiv) {
        closestHoverDiv
          .querySelector(QUERY_ADD_BUTTON)
          .classList.toggle(CLASS_HIDDEN);
        closestHoverDiv
          .querySelector(QUERY_REMOVE_BUTTON)
          .classList.toggle(CLASS_HIDDEN);
      }
    },
    onDocumentClick: async (e) => {
      let { target } = e;
      const closestHoverArea = target.closest(`.${CLASS_HOVER_AREA}`);
      if (!closestHoverArea) return;
      if (target.closest(".spread-button")) return;
      if (target.classList.contains("button")) return;
      const closestLi = closestHoverArea.closest("li");
      const selectedId = closestLi.dataset.id;
      const document = await getOneDocument(selectedId);
      push(`/documents/${document.id}`);
      this.setState({
        ...this.state,
        id: parseInt(selectedId),
        title: document.title,
        content: document.content,
      });
    },
    onTitleClick: () => {
      push("/");
    },
  });

  const $pageSection = document.querySelector(".page_content");

  const homePage = new HomePage({ $target: $pageSection });
  const editPage = new EditPage({
    $target: $pageSection,
    initialState: this.state,
    onChange: async (e) => {
      const { target } = e;
      const name = target.getAttribute("name");
      if (name === "title") {
        this.setState({
          ...this.state,
          title: target.innerText,
        });
      }
      if (name === "content") {
        this.setState({
          ...this.state,
          content: target.value,
        });
      }
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        this.setState({
          ...this.state,
          isSaving: true,
        });
        await modifyDocument(
          this.state.id,
          this.state.title,
          this.state.content
        );
        const documents = await getDocuments();
        this.setState({
          ...this.state,
          documents,
          isSaving: false,
        });
      }, 1000);
    },
  });

  const savingIndicator = new SavingIndicator({
    $target,
    initialState: this.state,
  });

  let timer = null;

  this.route = async () => {
    const { pathname } = window.location;
    const documents = await getDocuments();
    if (pathname === "/") {
      $pageSection.innerHTML = "";
      this.setState({
        ...this.state,
        documents,
        id: "",
        title: "",
        content: "",
      });
      homePage.init();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      const document = await getOneDocument(documentId);
      $pageSection.innerHTML = "";
      this.setState({
        ...this.state,
        documents,
        id: document.id,
        title: document.title,
        content: document.content,
      });
      editPage.init();
    }
  };

  this.route();
  initRouter(() => this.route());
}
