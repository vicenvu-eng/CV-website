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

  // Đóng modal khi bấm vào nền ngoài (không phải nội dung modal)
  window.addEventListener("click", (e) => {
    // Chỉ đóng nếu click trực tiếp vào .modal (nền ngoài), không phải .modal-content
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
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
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-up-visible");
      }
    });
  }, observerOptions);

  // Áp dụng observer cho các phần tử cần animation (KHÔNG gồm .modal)
  const animatedElements = document.querySelectorAll(
    ".skills, .summary, .education, .experience, .project, .like, .contact-card, .project li, .exp-item",
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
