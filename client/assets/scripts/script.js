const loader = document.querySelector('.loader'),
      scrollUp = document.querySelector(".scroll-up"),
      landingPage = document.querySelector(".landing"),
      backgrounds = ["one.jpg", "two.jpg", "three.jpg", "four.jpg"];

window.onload = () => {
  // document.body.classList.remove('loading')
  // loader.remove()

  if (window.scrollY > 1000) {
    scrollUp.classList.remove('hidden');
  } else {
    scrollUp.classList.add('hidden');
  }

  window.onscroll = () => {
    if (window.scrollY > 1000) {
      scrollUp.classList.remove('hidden');
    } else {
      scrollUp.classList.add('hidden');
    }
  };
  scrollUp.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

let i = 1;

  setInterval(function () {
    if (i < backgrounds.length - 1) {
      landingPage.style.backgroundImage = `url("./assets/images/backgrounds/${backgrounds[i]}")`;

      i++;
    } else {
      i = 0;
    }
  }, 7000);
}

setTimeout(() => {
  document.body.classList.remove('loading');
  loader.remove();
}, 2000)


window.addEventListener("load", function () {
  const toggleLangs = document.querySelector(".languages .change"),
    selectLangButtons = document.querySelectorAll(".languages .select a"),
    changeLangButtonsContainer = document.querySelector(".languages .select");

  selectLangButtons.forEach((lang) => {
    lang.addEventListener("click", function () {
      selectLangButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  toggleLangs.addEventListener("click", function (e) {
    this.parentElement.classList.toggle("change-language");
  });

  document.addEventListener("click", function (e) {
    if (e.target !== changeLangButtonsContainer && e.target !== toggleLangs) {
      toggleLangs.parentElement.classList.remove("change-language");
    }
  });

  changeLangButtonsContainer.onclick = (e) => {
    e.stopPropagation();
  };

  toggleLangs.onclick = (e) => {
    e.stopPropagation();
  };
});
