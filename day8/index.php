<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Form Demo</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

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

    <div class="card shadow p-4">

        <h2 class="text-center mb-4">
            Student Registration Demo
        </h2>

        <form method="POST">

            <!-- Checkbox -->
            <div class="mb-3">
                <label class="form-label">
                    Terms & Conditions
                </label><br>

                <input type="checkbox" name="agree">
                I Agree
            </div>

            <!-- Multiple Checkbox -->
            <div class="mb-3">
                <label class="form-label">
                    Skills
                </label><br>

                <input type="checkbox" name="skills[]" value="HTML"> HTML

                <input type="checkbox" name="skills[]" value="CSS"> CSS

                <input type="checkbox" name="skills[]" value="PHP"> PHP

                <input type="checkbox" name="skills[]" value="JavaScript"> JavaScript
            </div>

            <!-- Radio -->
            <div class="mb-3">

                <label class="form-label">
                    Gender
                </label><br>

                <input type="radio" name="gender" value="Male">
                Male

                <input type="radio" name="gender" value="Female">
                Female

            </div>

            <!-- Dropdown -->
            <div class="mb-3">

                <label class="form-label">
                    Branch
                </label>

                <select class="form-select" name="branch">

                    <option value="">Select Branch</option>

                    <option value="CSE">CSE</option>

                    <option value="IT">IT</option>

                    <option value="ECE">ECE</option>

                    <option value="ME">ME</option>

                </select>

            </div>

            <button class="btn btn-primary w-100">
                Submit
            </button>

        </form>

    </div>

<?php

if($_SERVER["REQUEST_METHOD"]=="POST")
{

?>

<div class="card mt-4 shadow p-4">

<h3 class="text-success">
Submitted Information
</h3>

<hr>

<?php

// Agree Checkbox

if(isset($_POST['agree']))
{
    echo "<b>Agreement:</b> Agreed<br><br>";
}
else
{
    echo "<b>Agreement:</b> Not Agreed<br><br>";
}

// Skills

echo "<b>Skills:</b><br>";

if(!empty($_POST['skills']))
{
    foreach($_POST['skills'] as $skill)
    {
        echo "- ".$skill."<br>";
    }
}
else
{
    echo "No Skills Selected";
}

echo "<br><br>";

// Gender

echo "<b>Gender:</b> ";

echo $_POST['gender'] ?? "Not Selected";

echo "<br><br>";

// Branch

echo "<b>Branch:</b> ";

if(!empty($_POST['branch']))
{
    echo $_POST['branch'];
}
else
{
    echo "Not Selected";
}

?>

</div>

<?php

}

?>

<div class="card mt-4 shadow p-4">

<h3>
Student List (foreach)
</h3>

<?php

$students=[
"Amit",
"Neha",
"Rahul",
"Ravi",
"Priya"
];

?>

<ul class="list-group">

<?php

foreach($students as $student)
{

?>

<li class="list-group-item">

<?php echo $student; ?>

</li>

<?php

}

?>

</ul>

</div>

</div>

</body>
</html>