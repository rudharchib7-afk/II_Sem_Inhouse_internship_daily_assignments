<?php

// Database Connection
$conn = mysqli_connect("localhost","root","","student_database");

if(!$conn){
    die("Connection Failed");
}

// Insert Data
if(isset($_POST['submit'])){

    $name = $_POST['name'];
    $college = $_POST['college'];
    $branch = $_POST['branch'];
    $city = $_POST['city'];
    $email = $_POST['email'];

    if($name!="" && $college!="" && $branch!="" && $city!="" && $email!=""){

        $sql = "INSERT INTO students(name,college,branch,city,email)
                VALUES('$name','$college','$branch','$city','$email')";

        mysqli_query($conn,$sql);
    }
}

// Fetch Students
$result = mysqli_query($conn,"SELECT * FROM students");

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Student Management</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
rel="stylesheet">

<style>

body{
background:#f4f6f9;
}

.card{
border-radius:12px;
}

</style>

</head>

<body>

<div class="container mt-5">

<div class="card p-4 shadow">

<h2 class="text-center">

Student Registration

</h2>

<form method="POST">

<div class="mb-3">

<label>Name</label>

<input
type="text"
name="name"
class="form-control"
required>

</div>

<div class="mb-3">

<label>College</label>

<input
type="text"
name="college"
class="form-control"
required>

</div>

<div class="mb-3">

<label>Branch</label>

<input
type="text"
name="branch"
class="form-control"
required>

</div>

<div class="mb-3">

<label>City</label>

<input
type="text"
name="city"
class="form-control"
required>

</div>

<div class="mb-3">

<label>Email</label>

<input
type="email"
name="email"
class="form-control"
required>

</div>

<button
class="btn btn-primary w-100"
name="submit">

Register

</button>

</form>

</div>

<!-- Student Table -->

<div class="card mt-5 shadow">

<div class="card-header bg-dark text-white">

<h4>Student Records</h4>

</div>

<div class="card-body">

<table class="table table-bordered table-hover">

<thead class="table-primary">

<tr>

<th>ID</th>

<th>Name</th>

<th>College</th>

<th>Branch</th>

<th>City</th>

<th>Email</th>

</tr>

</thead>

<tbody>

<?php

while($row=mysqli_fetch_assoc($result))
{

?>

<tr>

<td>

<?php echo $row['id']; ?>

</td>

<td>

<?php echo $row['name']; ?>

</td>

<td>

<?php echo $row['college']; ?>

</td>

<td>

<?php echo $row['branch']; ?>

</td>

<td>

<?php echo $row['city']; ?>

</td>

<td>

<?php echo $row['email']; ?>

</td>

</tr>

<?php

}

?>

</tbody>

</table>

</div>

</div>

<!-- Portfolio Section -->

<div class="card mt-5 p-4 shadow">

<h2>Portfolio</h2>

<h4>Education</h4>

<ul>

<li>ABC College</li>

<li>B.Tech CSE</li>

<li>Web Development</li>

</ul>

</div>

<!-- JavaScript Example -->

<div class="card mt-5 p-4 shadow">

<h2>JavaScript Object Example</h2>

<p>

Open Console (F12) to see output.

</p>

</div>

</div>

<script>

let person=[

{
name:"Kushagra",
branch:"CSE"
},

{
name:"Bhavesh",
branch:"IT"
},

{
name:"Rahul",
branch:"ECE"
}

];

console.log("Student Objects");

console.log(person);

for(let i=0;i<person.length;i++)
{
console.log(person[i].name);
}

</script>

</body>
</html>