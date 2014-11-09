// ------------------------
// PASSIONS.JS (SIDEFFECTS)
// ------------------------

// Show or Hide the passions block
function togglePassions() {
  var passions = $(".passions");

  if (passions.css("display") === "none") {
    passions.css({
      display: "block",
      opacity: "0",
      top: "20px"
    }).animate({
      top: "0",
      opacity: "1"
    });
    minimizeTop();
  }
  else {
    passions.css({})
    .animate({
      top: "20px",
      opacity: "0"
    }, {
      complete: function () {
        $(this).css('display', 'none');
      }
    });
  }
}
