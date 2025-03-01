document.getElementById("myUL").style.display = "none";
function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByClassName("searchlist");

  for (i = 0; i < li.length; i++) {
    document.getElementById("myUL").style.display = "none";
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
      console.log(filter.length);
    } else {
      li[i].style.display = "none";
      console.log(filter.length);
    }
    if (filter.length > 0) {
      document.getElementById("myUL").style.display = "block";
    } else {
      document.getElementById("myUL").style.display = "none";
    }
  }
}
