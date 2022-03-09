

// add logic to all close buttons on alerts
document.querySelectorAll("[data-btntype='close-alert']").forEach(function(el) {
  el.addEventListener("click", () => {
    el.parentNode.parentNode.style.display = "none";
  });
});

