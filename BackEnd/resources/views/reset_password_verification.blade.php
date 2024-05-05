<!-- resources/views/reset_password_verification.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Verification</title>
    <style>
        body {
            background-color: rgb(5, 5, 37);
            color: white
        }
    </style>
</head>

<body>
    <h1 style="background-color: rgb(4, 4, 36); color:antiquewhite; text-align:center ;width:30%;margin:auto">
        BusHub.</h1>

    <h3>{{ $subject }}</h3>
    <div style="border: 1px solid rgb(4, 4, 36); margin:30px auto; padding:20px; width:60%">
        <p>{{ $message }}</p>
        <p style="color: rgb(4, 4, 36);font-size:30px;font-weight:600; text-align:center">Code: {{ $otp }}</p>
    </div>
</body>

</html>
