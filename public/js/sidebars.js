$(document).ready(function () {
  // display only the first tab and make other hidden (display:none)
  let sidebarContent = document.getElementsByClassName("sidebar-content");
  for (i = 1; i < sidebarContent.length; i++) {
    sidebarContent[i].style.display = "none";
  }
});
function openSideTab(evt, tabName) {
  // Declare all variables
  let i, sidebarContent, tablinks;

  // Get all elements with class="sidebar-content" and hide them
  sidebarContent = document.getElementsByClassName("sidebar-content");
  for (i = 0; i < sidebarContent.length; i++) {
    sidebarContent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active-elemt"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active-elemt", "");
  }

  // Show the current tab, and add an "active-elemt" class to the element that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active-elemt";
}
