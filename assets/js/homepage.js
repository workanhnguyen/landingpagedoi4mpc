function getParent(element, selector) {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
}

var historySearch = JSON.parse(localStorage.getItem("history")) ?? [];

function renderHistory() {
  const historyBox = document.querySelector(".header-input-history");
  var history2 = [];

  const history = historySearch.map((history) => {
    return `
    <li class="history-item">
      <a href="">
        <p>${history}</p>
        <i class="fas fa-times history-icon"></i>
      </a>
    </li>
    `;
  });
  for (var i = history.length - 1; i >= 0; i--) {
    history2.push(history[i]);
  }

  historyBox.innerHTML = history2.join("");

  headerInput();
}

function headerInput() {
  const inputE = document.querySelector(".header-input");
  const ulE = document.querySelector(".header-input-history");
  const exitE = document.querySelectorAll(".history-item .history-icon");

  inputE.onkeyup = (e) => {
    var keycode = e.keyCode;
    console.log(inputE.value);

    if (keycode == 13 && inputE.value != "") {
      historySearch.forEach((history, index) => {
        if (inputE.value == history) {
          historySearch.splice(index, 1);
        }
      });
      historySearch.push(inputE.value);
      localStorage.setItem("history", JSON.stringify(historySearch));
      inputE.value = "";
      renderHistory();
    }
  };

  exitE.forEach((exit) => {
    exit.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      const parentE = getParent(exit, ".history-item");
      const textP = parentE.querySelector("p").innerText;

      historySearch.forEach((history, index) => {
        if (history.includes(textP)) {
          historySearch.splice(index, 1);
          localStorage.setItem("history", JSON.stringify(historySearch));
          renderHistory();
        }
      });
    };
  });

  window.onscroll = (e) => {
    document
      .querySelector(".header__box")
      .classList.toggle("sticky", window.scrollY > 0);
  };
  ulE.onmousedown = (e) => {
    e.preventDefault();
  };
}

renderHistory();
