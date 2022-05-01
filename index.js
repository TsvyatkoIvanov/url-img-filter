let urlsList = [];
let currentImgUrl;

const buttonYes = document.getElementById("button-yes");
const buttonNo = document.getElementById("button-no");

const urlPreview = document.getElementById("url-preview");
const fileSelect = document.getElementById("file-select");
const noMoreUrlsDiv = document.getElementById("no-more-urls-header");

fileSelect.addEventListener("change", (event) => {
  const file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let str = event.target.result;
    try {
      urlsList = JSON.parse(str);
      currentImgUrl = urlsList[0];
      setNewImage(currentImgUrl);
      window.localStorage.setItem("favorite-urls", JSON.stringify([]));
      window.localStorage.setItem("imported-urls", JSON.stringify(urlsList));
    } catch (e) {
      console.log(e);
    }
  };

  // Read the file
  reader.readAsText(file);
});

function removeUrlFromOriginalList(url) {
  try {
    const urlsString = window.localStorage.getItem("imported-urls");
    let urlsList = urlsString ? JSON.parse(urlsString) : [];
    const index = urlsList.findIndex(function (u) {
      return u === url;
    });
    if (index > -1) {
      urlsList.splice(index, 1);
      if (urlsList.length > 0) {
        currentImgUrl = urlsList[0];
        setNewImage(currentImgUrl);
      } else {
        noMoreUrlsDiv.classList = "flex";
      }
      window.localStorage.setItem("imported-urls", JSON.stringify(urlsList));
    }
  } catch (e) {
    console.log(e);
  }
}

function addUrlToFav(url) {
  try {
    const favUrlsString = window.localStorage.getItem("favorite-urls");
    let favUrls = [];
    if (favUrlsString) {
      favUrls = JSON.parse(favUrlsString);
      favUrls.push(url);
    } else {
      favUrls.push(url);
    }
    window.localStorage.setItem("favorite-urls", JSON.stringify(favUrls));
  } catch (e) {
    console.log(e);
  }
}

function setNewImage(url) {
  urlPreview.src = url;
}

function onClickYes() {
  addUrlToFav(currentImgUrl);
  removeUrlFromOriginalList(currentImgUrl);
}

function onClickNo() {
  removeUrlFromOriginalList(currentImgUrl);
}

function getList() {
  try {
    const favUrlsString = window.localStorage.getItem("favorite-urls");
    favUrls = JSON.parse(favUrlsString);
    const a = document.getElementById("a");
    const file = new Blob([JSON.stringify(favUrls, null, 2)], { type: "json" });
    a.href = URL.createObjectURL(file);
    a.download = "d.json";
    a.click();
  } catch (e) {
    console.log(e);
  }
}
