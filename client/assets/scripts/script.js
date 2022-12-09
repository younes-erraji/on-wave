const loader = document.querySelector('.loader'),
      scrollUp = document.querySelector(".scroll-up"),
      landingPage = document.querySelector(".landing"),
      storeImageForm = document.getElementById("store-image"),
      imageInput = document.getElementById("image"),
      imageError = document.querySelector(".image-error"),
      invalidLinks = document.querySelectorAll('a[href="#"]'),
      navToggler = document.querySelector('.nav-toggler');
      navbarLinks = document.querySelector('.nav-links'),
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

  storeImageForm.onsubmit = (e) => {
    if (!imageInput.value) {
      e.preventDefault();
      imageError.textContent = "Please Choose an image Before Saving!";
    }
  };

  setTimeout(() => {
    document.body.classList.remove('loading');
    loader.remove();
  }, 2000);

  invalidLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
  });

  navToggler.onclick = function () {
    navbarLinks.classList.toggle('visible');
  }
}

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
