<?php
session_start();

/* Database Connection */
$conn = mysqli_connect("localhost", "root", "", "student_database");

if (!$conn) {
    die("Database Connection Failed");
}

/* Delete Student */
if (isset($_GET['delete'])) {

    $id = (int)$_GET['delete'];

    mysqli_query($conn, "DELETE FROM students WHERE id=$id");

    $_SESSION['message'] = "Student deleted successfully.";

    header("Location: index.php");
    exit();
}

/* Search */
$search = "";

if (isset($_GET['search'])) {

    $search = mysqli_real_escape_string($conn, $_GET['search']);

    $sql = "SELECT * FROM students
            WHERE name LIKE '%$search%'
            OR college LIKE '%$search%'
            OR branch LIKE '%$search%'
            OR city LIKE '%$search%'
            ORDER BY id";

} else {

    $sql = "SELECT * FROM students ORDER BY id";

}

$result = mysqli_query($conn, $sql);

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Student Management System</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

body{
    background:#f4f6f9;
}

.card{
    border-radius:15px;
}

.table th{
    text-align:center;
}

.table td{
    vertical-align:middle;
}

</style>

</head>

<body>

<div class="container mt-5">

<div class="card shadow">

<div class="card-header bg-primary text-white">

<div class="d-flex justify-content-between align-items-center">

<h3>🎓 Student Management System</h3>

<span>Total Students</span>

</div>

</div>

<div class="card-body">

<?php

if(isset($_SESSION['message']))
{
?>

<div class="alert alert-success">

<?php

echo $_SESSION['message'];

unset($_SESSION['message']);

?>

</div>

<?php
}
?>

<form method="GET">

<div class="row mb-3">

<div class="col-md-10">

<input
type="text"
name="search"
class="form-control"
placeholder="Search by Name, College, Branch or City"
value="<?php echo $search; ?>">

</div>

<div class="col-md-2">

<button class="btn btn-primary w-100">

Search

</button>

</div>

</div>

</form>

<div class="table-responsive">

<table class="table table-bordered table-hover">

<thead class="table-dark">

<tr>

<th>ID</th>

<th>Name</th>

<th>College</th>

<th>Branch</th>

<th>City</th>

<th width="170">Action</th>

</tr>

</thead>

<tbody>

<?php

if(mysqli_num_rows($result)>0)
{

while($row=mysqli_fetch_assoc($result))
{

?>

<tr>

<td><?php echo $row['id']; ?></td>

<td><?php echo $row['name']; ?></td>

<td><?php echo $row['college']; ?></td>

<td><?php echo $row['branch']; ?></td>

<td><?php echo $row['city']; ?></td>

<td>

<a
href="#"
class="btn btn-warning btn-sm">
Edit
</a>

<a
href="?delete=<?php echo $row['id']; ?>"
class="btn btn-danger btn-sm"
onclick="return confirm('Are you sure you want to delete this student?');">

Delete

</a>

</td>

</tr>

<?php

}

}
else
{

?>

<tr>

<td colspan="6" class="text-center">

No Students Found

</td>

</tr>

<?php

}

?>

</tbody>

</table>

</div>

</div>

</div>

</div>

</body>

</html>
