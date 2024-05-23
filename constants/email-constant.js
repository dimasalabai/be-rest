const emailFile = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>BeRest</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #000000;
				margin: 0;
				padding: 0;
			}
			.container {
				width: 100%;
				max-width: 600px;
				margin: 0 auto;
				background-color: #1f1f1f;
				color: #ffffff;
				border-radius: 10px;
				overflow: hidden;
			}
			.header {
				background-color: #282828;
				padding: 40px;
				text-align: center;
			}
			.header > h1 > span {
				color: #3c9af1;
			}
			.header > h1 > span + span {
				color: #efb94f;
			}
			h1 {
				margin-bottom: 20px;
				font-size: 36px;
				letter-spacing: 2px;
			}
			p {
				font-size: 18px;
				line-height: 1.6;
				margin-bottom: 20px;
				padding: 0 20px;
				text-align: center;
			}
			a {
				color: #1abc9c;
				text-decoration: none;
				font-weight: bold;
			}
			.footer {
				background-color: #282828;
				padding: 20px;
				text-align: center;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="header">
				<h1>Welcome to <span>Be</span><span>Rest</span></h1>
			</div>
			<div class="content">
				<p>Dear User,</p>
				<p>
					Thank you for reaching out to BeRest! We greatly appreciate your trust
					and are excited to assist you in organizing an unforgettable trip. One
					of our specialists will contact you shortly to provide all the
					necessary information and help you choose a country and hotel.
				</p>

				<p>
					Stay tuned for more updates, more magic, and more marvels from BeRest.
				</p>
				<p>
					<a href="https://dimasalabai.github.io/be-rest-front/">Explore BeRest Now</a>
				</p>
				<p>Best regards,</p>
				<p>The BeRest Team</p>
			</div>
			<div class="footer">
				<p>&copy; 2024 BeRest. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>

`;
export default emailFile;
