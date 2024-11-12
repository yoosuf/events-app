<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Event Participation</title>
</head>
<body>
    <h1>Hi {{ $participant->user->name }},</h1>
    <p>Thank you for joining the event. Please verify your participation by clicking the link below:</p>
    <p><a href="{{ $verificationUrl }}">Verify Participation</a></p>
    <p>If you did not join this event, you can ignore this email.</p>
</body>
</html>
