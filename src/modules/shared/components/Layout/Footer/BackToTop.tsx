"use client";

function BackToTop() {
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to Top
    </button>
  );
}

export default BackToTop;
