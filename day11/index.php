<?php
session_start();

/* Login */
if(isset($_POST['login']))
{
    $_SESSION['email']=$_POST['email'];
}

/* Logout */
if(isset($_GET['logout']))
{
    session_destroy();
    header("Location:index.php");
    exit();
}

/* Page Visit Counter */
if(isset($_SESSION['email']))
{
    if(!isset($_SESSION['count']))
    {
        $_SESSION['count']=1;
    }
    else
    {
        $_SESSION['count']++;
    }

    $_SESSION['user']=array(
        "name"=>"Mahesh",
        "role"=>"Admin",
        "city"=>"Jaipur"
    );
}
?>

<!DOCTYPE html>
<html>
<head>

<title>PHP Session Demo</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body class="bg-light">

<div class="container mt-5">

<div class="card shadow">

<div class="card-header bg-primary text-white">

<h2>PHP Session Example</h2>

</div>

<div class="card-body">

<?php if(!isset($_SESSION['email'])){ ?>

<form method="post">

<label>Email</label>

<input
type="email"
name="email"
class="form-control"
required>

<br>

<button
name="login"
class="btn btn-primary">

Login

</button>

</form>

<?php } else { ?>

<h3 class="text-success">
Welcome <?php echo $_SESSION['email']; ?>
</h3>

<hr>

<h5>Session Array Data</h5>

<table class="table table-bordered">

<tr>
<th>Name</th>
<td><?php echo $_SESSION['user']['name']; ?></td>
</tr>

<tr>
<th>Role</th>
<td><?php echo $_SESSION['user']['role']; ?></td>
</tr>

<tr>
<th>City</th>
<td><?php echo $_SESSION['user']['city']; ?></td>
</tr>

<tr>
<th>Page Visits</th>
<td><?php echo $_SESSION['count']; ?></td>
</tr>

</table>

<a href="?logout=1" class="btn btn-danger">
Logout
</a>

<?php } ?>

</div>

</div>

</div>

</body>
</html>