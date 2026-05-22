/**
 * Tên file: script.js
 * Mô tả: Xử lý logic tương tác cho trang CV
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. CHUẨN BỊ DOM
  const openBtns = document.querySelectorAll(".btn-open-modal");
  const closeBtns = document.querySelectorAll(".close-btn");
  const downloadCvBtn = document.querySelector(".btn-download");

  // Khai báo Hamburger ở ĐÂY (chỉ 1 lần duy nhất)
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuItems = document.querySelectorAll(".nav-links li a");

  // 2. HÀM XỬ LÝ MODAL
  const openModal = (targetID) => {
    const modal = document.getElementById(targetID);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  // 3. GẮN SỰ KIỆN

  // --- Logic cho Modal ---
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.target);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".modal"));
    });
  });

  // Đóng modal khi bấm vào vùng nền tối bên ngoài khung trắng
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.show");
      if (activeModal) closeModal(activeModal);
    }
  });

  // --- Logic cho Menu Hamburger (ĐÃ FIX TỰ ĐÓNG) ---
  if (hamburgerBtn && navLinks) {
    // Bật/tắt menu khi bấm nút 3 gạch
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Tự động đóng menu khi bấm vào từng đường link
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // --- Logic Tải CV ---
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const fileUrl = downloadCvBtn.getAttribute("href");
      const fileName =
        downloadCvBtn.getAttribute("download") || "CV-Tran-Vu.pdf";

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error();
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = blobUrl;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        const tempLink = document.createElement("a");
        tempLink.href = fileUrl;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
      }
    });
  }

  // ===== 4. SCROLL ANIMATION (Animation khi cuộn tới) =====
  const animatedElements = document.querySelectorAll(
    ".skills, .summary, .education, .experience, .project, .like, .contact-card, .project li, .exp-item",
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    animatedElements.forEach((el) => {
      el.classList.add("scroll-reveal", "slide-up-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    animatedElements.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
  }
});
