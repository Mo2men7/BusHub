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

        * {
            box-sizing: border-box
        }

        .subject {
            box-sizing: border-box;
            font-size: 20px;
            font-weight: 500;
            padding-bottom: 20px;
            border-bottom: 1px solid rgb(22, 22, 74);
            text-align: center;
            width: 30%;
            padding-top: 0;
            margin-top: 0;
            margin: 0 auto;
        }

        .head {
            box-sizing: border-box;
            font-size: 40px;
            font-weight: 900;
            padding: 0 0;
            margin-bottom: 0;
            text-align: center;
            width: 30%;
            color: rgb(22, 22, 74);
            margin: 0 auto;

        }
    </style>
</head>

<body>
    <p class="head">BusHub.</p>

    <p class="subject">{{ $subject }}</p>
    <div style=" margin:15px auto; padding:10px; width:60%">
        <p style="text-align: center">{{ $message }}</p>
        <p style="color: rgb(22, 22, 74);font-size:30px;font-weight:600; text-align:center">Code: {{ $otp }}</p>
    </div>
    <p>Thanks</p>
    <p>BusHub Team</p>

</body>

</html>
