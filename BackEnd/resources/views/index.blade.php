<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
</head>
<style>
    form {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    button {
        background: black;
        border-radius: 20px;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: .5s ease;
    }

    button:hover {
        background: gray;
    }
</style>

<body style="height:100vh;">
    {{-- <form action="/checkout" method="post">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <button type="submit">Checkout</button>
    </form> --}}
    <a href="{{ route('google') }}">Link Text</a>

</body>

</html>
