// const sideNav = document.querySelector(".sidenav");
// M.Sidenav.init(sideNav, {});

var clipboard = new ClipboardJS(".copy-button");
clipboard.on("success", function(e) {
    // Alert Toast
    var toast = Metro.toast.create;
    toast("Copied!", null, 5000, "toast");

    e.clearSelection();
});
