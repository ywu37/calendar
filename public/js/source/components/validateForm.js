function validateForm() {
    var x = document.forms["addEvent"]["date"].value;
    var y = document.forms["addEvent"]["title"].value;
    var z = document.forms["addEvent"]["location"].value;
    var d = document.forms["addEvent"]["description"].value;
    if (x == null || x == "") {
        alert("Date should be picked");
        return false;
    }
    if (y == null || y == "") {
        alert("Title should be filled");
        return false;
    }
    if (z == null || z == "") {
        alert("Location should be filled");
        return false;
    }
    if (d == null || d == "") {
        alert("Description should be filled");
        return false;
    }
}