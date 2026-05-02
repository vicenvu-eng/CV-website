/**
 * Tên file: script.js
 * Mô tả: Xử lý logic tương tác cho trang CV
 * Chuẩn: Clean code, ES6+, UX/Accessibility
 */

// Bọc toàn bộ code để bảo vệ biến không bị rò rỉ ra toàn cầu (Scope isolation)
document.addEventListener("DOMContentLoaded", () => {
  // 1. CHUẨN BỊ DOM (Gom hết các phần tử lên đầu)
  const openBtns = document.querySelectorAll(".btn-open-modal");
  const closeBtns = document.querySelectorAll(".close-btn"); // Đã sửa đúng tên class
  const downloadCvBtn = document.querySelector(".btn-dowload");

  // 2. ĐỊNH NGHĨA CÁC HÀM XỬ LÝ LÕI (Tách biệt logic)

  // Hàm mở Modal
  const openModal = (targetID) => {
    const modal = document.getElementById(targetID);
    if (modal) {
      // Đã sửa lỗi chữ "ìf"
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  };

  // Hàm đóng Modal
  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  // 3. GẮN CẢM BIẾN (Sự kiện người dùng)

  // Bấm nút MỞ
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Chuẩn ES6: Dùng dataset ngắn gọn hơn getAttribute('data-target')
      const targetID = btn.dataset.target;
      openModal(targetID);
    });
  });

  // Bấm nút X để ĐÓNG
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  // Bấm ra ngoài vùng đen để ĐÓNG
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });

  // Chuẩn Accessibility: Bấm phím ESC trên bàn phím để ĐÓNG
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Tìm xem có cái modal nào đang mở (có class 'show') không
      const activeModal = document.querySelector(".modal.show");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // Ép tải CV thay vì mở tab PDF
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      const fileUrl = downloadCvBtn.getAttribute("href");
      const fileName = downloadCvBtn.getAttribute("download") || "CV-Tran-Vu.pdf";

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Cannot download CV file.");
        }

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
        // Fallback: nếu fetch bị chặn, dùng cách tải mặc định của trình duyệt
        const tempLink = document.createElement("a");
        tempLink.href = fileUrl;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
      }
    });
  }
});
