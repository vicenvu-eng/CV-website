const openBtns = document.querySelectorAll(".btn-open-modal");
const closeBtns = document.querySelectorAll(".close-btn"); // Đã sửa tên ở đây

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetID = btn.getAttribute("data-target");
    const modal = document.getElementById(targetID);
    if (modal) modal.classList.add("show");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (modal) modal.classList.remove("show");
  });
});

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("show");
  }
});
