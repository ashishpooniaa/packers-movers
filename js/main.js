(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
      function toggleNavbarMethod() {
          if ($(window).width() > 992) {
              $(".navbar .dropdown")
                  .on("mouseover", function () {
                      $(".dropdown-toggle", this).trigger("click");
                  })
                  .on("mouseout", function () {
                      $(".dropdown-toggle", this).trigger("click").blur();
                  });
          } else {
              $(".navbar .dropdown").off("mouseover").off("mouseout");
          }
      }
      toggleNavbarMethod();
      $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          $(".back-to-top").fadeIn("slow");
      } else {
          $(".back-to-top").fadeOut("slow");
      }
  });
  $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
  });

  // Modal Video
  $(document).ready(function () {
      var $videoSrc;
      $(".btn-play").click(function () {
          $videoSrc = $(this).data("src");
      });
      console.log($videoSrc);

      $("#videoModal").on("shown.bs.modal", function (e) {
          $("#video").attr(
              "src",
              $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
          );
      });

      $("#videoModal").on("hide.bs.modal", function (e) {
          $("#video").attr("src", $videoSrc);
      });
  });

  // Review section
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.getElementById("current-rating");
  const reviewForm = document.getElementById("review-form");
  const reviewInput = document.getElementById("review-input");
  const reviewsContainer = document.getElementById("reviews-container");

  let currentRating = 0;

  // Event listeners for rating stars
  stars.forEach((star) => {
      star.addEventListener("click", () => {
          currentRating = parseInt(star.dataset.value);
          ratingValue.textContent = getStars(currentRating);

          // Highlight selected stars
          highlightStars(currentRating);
      });
  });

  // Function to return stars based on rating
  function getStars(rating) {
      return "★".repeat(rating);
  }

  // Function to highlight stars
  function highlightStars(rating) {
      stars.forEach((star) => {
          star.style.color = parseInt(star.dataset.value) <= rating ? "#f7b307" : "black";
      });
  }

  // Event listener for review submission
  reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const reviewText = reviewInput.value.trim();
      if (reviewText === "" || currentRating === 0) {
          alert("Please provide both rating and review text.");
          return;
      }
      // Save review to backend or display it
      saveReview(reviewText, currentRating);
      // Clear the input field after submission
      reviewInput.value = "";
      // Reset the rating
      currentRating = 0;
      ratingValue.textContent = getStars(currentRating);
      // Reset star colors
      highlightStars(currentRating);
  });

  // Function to save review (replace with actual backend call)
  function saveReview(text, rating) {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review");
      reviewItem.innerHTML = `
          <p><strong>Rating:</strong> ${getStars(rating)}</p>
          <p>${text}</p>
      `;
      reviewsContainer.appendChild(reviewItem);
  }
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // Auto-fill name and email if browser's autofill is available
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("email").value = localStorage.getItem("email") || "";

  // Handle form submission
  document
      .getElementById("review-form")
      .addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent default form submission

          // Get form values
          var name = document.getElementById("name").value;
          var email = document.getElementById("email").value;
          var review = document.getElementById("review-input").value;

          // Display review
          var reviewHTML =
              "<div><strong>" +
              name +
              "</strong> (" +
              email +
              "): " +
              review +
              "</div>";
          document
              .getElementById("reviews-container")
              .insertAdjacentHTML("beforeend", reviewHTML);

          // Save name and email to localStorage
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);

          // Clear form fields
          document.getElementById("review-form").reset();
      });
});
