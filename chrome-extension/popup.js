document.getElementById("save").addEventListener("click", function () {
  loadPage("save");
});

document.getElementById("view").addEventListener("click", function () {
  loadPage("view");
});

function loadPage(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0 && tabs[0].url) {
          var iframe = document.getElementById("resultFrame");
          var statusMessage = document.getElementById("statusMessage");
          var loader = document.getElementById("loader");

          var url =
              action === "save"
                  ? "https://web.archive.org/save/" + tabs[0].url
                  : "https://web.archive.org/web/" + tabs[0].url;

          iframe.src = url;
          iframe.style.height = "300px";
          loader.style.display = "block";
          statusMessage.style.display = "none";

          toggleButtonsVisibility();

          iframe.onload = function () {
              loader.style.display = "none";
              statusMessage.textContent =
                  action === "save" ? "Page saved successfully!" : "Page loaded successfully!";
              statusMessage.style.display = "block";

              setTimeout(function () {
                  statusMessage.style.display = "none";
              }, 3000);
          };
      }
  });
}

document.getElementById("openNewTab").addEventListener("click", function () {
  var iframe = document.getElementById("resultFrame");
  if (iframe.src) {
      chrome.tabs.create({ url: iframe.src });
  }
});

document.getElementById("closeIframe").addEventListener("click", function () {
  var iframe = document.getElementById("resultFrame");
  iframe.src = "";
  iframe.style.height = "0";
  document.getElementById("statusMessage").style.display = "none";
  document.getElementById("loader").style.display = "none";
  toggleButtonsVisibility();
});

function toggleButtonsVisibility() {
  var iframe = document.getElementById("resultFrame");
  var openNewTabBtn = document.getElementById("openNewTab");
  var closeIframeBtn = document.getElementById("closeIframe");

  if (iframe.style.height !== "0px") {
      openNewTabBtn.style.display = "block";
      closeIframeBtn.style.display = "block";
  } else {
      openNewTabBtn.style.display = "none";
      closeIframeBtn.style.display = "none";
  }
}
