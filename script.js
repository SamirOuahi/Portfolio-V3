// Sélection de la flèche
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  const scrollStep = -window.scrollY / (500 / 15);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
});

function elementIsVisible(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * 0.75;
}

function activateAnimations() {
  var elementsDroite = document.querySelectorAll(".cadre-droite");
  var elementsGauche = document.querySelectorAll(".cadre-gauche");
  var elementsH1Effet = document.querySelectorAll(".h1-effet");
  var elementsH1Effet2 = document.querySelectorAll(".h1-effet2");

  elementsDroite.forEach(function (el) {
    if (elementIsVisible(el)) {
      el.classList.add("animate-slide");
    }
  });

  elementsGauche.forEach(function (el) {
    if (elementIsVisible(el)) {
      el.classList.add("animate-slide");
    }
  });

  elementsH1Effet.forEach(function (el) {
    if (elementIsVisible(el)) {
      el.classList.add("animate-slide");
    }
  });

  elementsH1Effet2.forEach(function (el) {
    if (elementIsVisible(el)) {
      el.classList.add("animate-slide");
    }
  });
}

window.addEventListener("scroll", activateAnimations);
activateAnimations();

document.querySelectorAll(".scroll-down, .links").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const offset = -100; // Adjust this value as needed to stop above the title
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

$(document).ready(function () {
  $('input[name="typeUserDevis"]').on("change", function () {
    var value = $(this).val();
    if (value == "Association" || value == "Société") {
      $('input[name="enseigneDevis"]').parent().show();
      $('input[name="enseigneDevis"]').attr(
        "placeholder",
        value == "Association" ? "Nom de l'association" : "Nom de l'entreprise"
      );
    } else {
      $('input[name="enseigneDevis"]').parent().hide();
    }
  });

  $("#idFormDevis").on("submit", function (event) {
    event.preventDefault();

    var captcha = $('input[name="captchaDevis"]').val();
    if (captcha != "9") {
      alert("Erreur : CAPTCHA incorrect.");
      return;
    }

    var formData = {
      nomDevis: $('input[name="nomDevis"]').val(),
      typeUserDevis: $('input[name="typeUserDevis"]:checked').val(),
      enseigneDevis: $('input[name="enseigneDevis"]').val(),
      emailDevis: $('input[name="emailDevis"]').val(),
      telDevis: $('input[name="telDevis"]').val(),
      urlDevis: $('input[name="urlDevis"]').val(),
      typeProjetDevis: $('select[name="typeProjetDevis"]').val(),
      descDevis: $('textarea[name="descDevis"]').val(),
      consent: $('input[name="chkRGPDDevis"]').is(":checked") ? "Oui" : "Non",
    };

    console.log("Form Data: ", formData);

    emailjs.send("service_2z1zata", "template_1gcok2i", formData).then(
      function (response) {
        console.log("EmailJS Response: ", response);
        alert("Votre demande de devis a été envoyée avec succès.");
      },
      function (error) {
        console.error("EmailJS Error: ", error);
        alert(
          "Une erreur s'est produite lors de l'envoi de votre demande de devis. Veuillez réessayer."
        );
      }
    );
  });
});
