<?php
$errors = [];
$success = false;

$name = "";
$email = "";
$course = "";
$city = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $course = $_POST['course'];
    $city = $_POST['city'];

    if ($name == "") {
        $errors[] = "Name is required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Enter a valid email.";
    }

    if ($course == "") {
        $errors[] = "Select a course.";
    }

    if ($city == "") {
        $errors[] = "Select a city.";
    }

    if (count($errors) == 0) {
        $success = true;
    }
}
?>

<!DOCTYPE html>
<html>

<head>

    <title>Student Registration Project</title>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">

    <style>

        body{
            background:#f5f5f5;
        }

        .student-card img{
            height:200px;
            object-fit:cover;
        }

        pre{
            background:#222;
            color:#00ff00;
            padding:15px;
            border-radius:10px;
        }

    </style>

</head>

<body>

<nav class="navbar navbar-dark bg-dark">

<div class="container">

<h3 class="text-white">
Student Registration System
</h3>

</div>

</nav>

<div class="container mt-5">

<h2 class="mb-4">
Registration Form
</h2>

<?php

if(!empty($errors))
{
?>

<div class="alert alert-danger">

<ul>

<?php

foreach($errors as $error)
{
echo "<li>$error</li>";
}

?>

</ul>

</div>

<?php
}
?>

<?php

if($success)
{
?>

<div class="alert alert-success">

<h4>Registration Successful</h4>

<p><b>Name :</b> <?php echo $name; ?></p>

<p><b>Email :</b> <?php echo $email; ?></p>

<p><b>Course :</b> <?php echo $course; ?></p>

<p><b>City :</b> <?php echo $city; ?></p>

</div>

<?php
}
?>

<form method="POST" class="card p-4 shadow">

<div class="mb-3">

<label>Name</label>

<input
type="text"
name="name"
class="form-control"
value="<?php echo $name; ?>">

</div>

<div class="mb-3">

<label>Email</label>

<input
type="email"
name="email"
class="form-control"
value="<?php echo $email; ?>">

</div>

<div class="mb-3">

<label>Course</label>

<select
name="course"
class="form-select">

<option value="">Select</option>

<option>Web Development</option>

<option>Java</option>

<option>Python</option>

<option>PHP</option>

</select>

</div>

<div class="mb-3">

<label>City</label>

<select
name="city"
class="form-select">

<option value="">Select</option>

<option>Delhi</option>

<option>Mumbai</option>

<option>Bangalore</option>

<option>Jaipur</option>

</select>

</div>

<button class="btn btn-primary">

Register

</button>

</form>

<hr class="my-5">

<h2>Student Directory</h2>

<input
id="search"
class="form-control mb-4"
placeholder="Search Student">

<div class="row">

<div class="col-md-4 student">

<div class="card student-card">

<img src="https://i.pravatar.cc/300?img=11">

<div class="card-body">

<h5 class="card-title">
Rahul
</h5>

<p>CSE</p>

</div>

</div>

</div>

<div class="col-md-4 student">

<div class="card student-card">

<img src="https://i.pravatar.cc/300?img=12">

<div class="card-body">

<h5 class="card-title">
Harsh
</h5>

<p>Web Development</p>

</div>

</div>

</div>

<div class="col-md-4 student">

<div class="card student-card">

<img src="https://i.pravatar.cc/300?img=13">

<div class="card-body">

<h5 class="card-title">
Virat
</h5>

<p>Python</p>

</div>

</div>

</div>

</div>

<hr>

<h2>JavaScript Output</h2>

<pre id="output"></pre>

</div>

<script>

//////////////////////////////
// Search
//////////////////////////////

const search=document.getElementById("search");

const students=document.querySelectorAll(".student");

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

students.forEach(function(student){

let name=student.querySelector(".card-title").textContent.toLowerCase();

student.style.display=name.includes(value)?"block":"none";

});

});

//////////////////////////////
// Map
//////////////////////////////

let numbers=[10,20,30,40];

let doubled=numbers.map(function(x){

return x*2;

});

console.log(doubled);

//////////////////////////////
// Promise
//////////////////////////////

let promise=new Promise(function(resolve,reject){

let login=true;

if(login)
resolve("Login Successful");

else
reject("Login Failed");

});

promise

.then(function(result){

console.log(result);

})

.catch(function(error){

console.log(error);

});

//////////////////////////////
// JSON
//////////////////////////////

let student={

name:"Rahul",

branch:"CSE",

marks:95

};

let json=JSON.stringify(student);

let object=JSON.parse(json);

console.log(json);

console.log(object);

//////////////////////////////
// Show Output
//////////////////////////////

document.getElementById("output").textContent=

"Original Array : "+numbers+

"\n\nDoubled Array : "+doubled+

"\n\nJSON Data :\n"+json+

"\n\nOpen F12 Console to see Promise Output.";

</script>

</body>

</html>