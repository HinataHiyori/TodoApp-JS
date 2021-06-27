import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createInCompleteList(inputText);
};

const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

const createInCompleteList = (text) => {
  // .list-row生成
  const listRow = document.createElement("li");
  listRow.className = "list-row";

  // contentの生成
  const contentDiv = document.createElement("div");
  contentDiv.className = "content";
  contentDiv.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(list-row)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);

    // 完了リストに追加する要素の取得
    const addTarget = completeButton.parentNode;

    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    //content以下を初期化
    addTarget.textContent = null;

    //content要素の生成
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    contentDiv.innerHTML = text;

    // 戻るbuttonの生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 戻すボタンを押したら親タグを削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // 戻すテキストの取得
      const text = backButton.parentNode.firstChild.innerText;

      createInCompleteList(text);
    });

    // addTargetの子要素に各要素を設定
    addTarget.appendChild(contentDiv);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(list-row)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  // list-rowの子要素に各要素を設定
  listRow.appendChild(contentDiv);
  listRow.appendChild(completeButton);
  listRow.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(listRow);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
