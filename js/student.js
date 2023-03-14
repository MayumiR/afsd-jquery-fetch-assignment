
function loadAllData() {
    fetch('http://localhost:8080/student/get-all-students', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}

    })
        .then(res => res.json())
        .then(dataset => {

            $("#myTable").DataTable({

                data: dataset,
                "columns": [
                    {"data": "id"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "salary"}
                ],
                "bDestroy": true

            })
        })
        .catch(err => console.log(err))
}


hideContent();

function hideContent() {
    document.getElementById('form').style.display = "none";
    document.getElementById('student-table').style.display = "none";
    document.getElementById('welcome').style.display = "block";

}

function viewHome() {
    document.getElementById('form').style.display = "none";
    document.getElementById('student-table').style.display = "none";
    document.getElementById('welcome').style.display = "block";
}


function viewAddStudent() {
    document.getElementById('form').style.display = "block";
    document.getElementById('student-table').style.display = "none";
    document.getElementById('welcome').style.display = "none";

}



function viewAllStudentList() {
    document.getElementById('form').style.display = "none";
    document.getElementById('student-table').style.display = "block";
    document.getElementById('welcome').style.display = "none";
    loadAllData();
}


function clearFields() {
    $("#id").val("");
    $("#name").val("");
    $("#address").val("");
    $("#salary").val("");
    $("#response").html('');
}



function saveStudent() {

    if ($("#id").val() == "" || $("#name").val() == "" || $("#address").val() == ""
        || $("#salary").val() == "") {
        $("#response").html("<div class='alert alert-warning col p-1 m-0' role='alert'>"
            + "First Fill All Fields" + "</div>")

    } else {
        var post_id = $("#id").val();
        var post_name = $("#name").val();
        var post_address = $("#address").val();
        var post_salary = $("#salary").val();

        fetch('http://localhost:8080/student/save-student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: post_id,
                name: post_name,
                address: post_address,
                salary: post_salary


            })
        }).then(response => {
            if (response.ok) {
                console.log('save successful');
                $("#response").html("<div class='alert alert-success col p-1 m-0' role='alert'>"
                    + "Saved Successfully" + "</div>")
            } else {
                console.log('save failed');
                $("#response").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "Failed to Save Data" + "</div>")
            }
        }).catch(err => {
                console.log(err.message)
                $("#response").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "An error occurred" + "</div>")
            }).finally(clearField())

    }
}

