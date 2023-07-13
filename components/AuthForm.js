import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";

export default function AuthForm() {
	const router = useRouter();
	const [authError, setAuthError] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const getVisibility = (param) => {
		return param ? "visible" : "hidden";
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const result = await signIn("credentials", {
			redirect: false,
			username,
			password
		});

		if (!result?.error) {
			router.replace("/");
			setAuthError(result?.error);
		} else {
			setAuthError(result?.error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box component="form" noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								fullWidth
								id="username"
								label="User Name"
								name="username"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormHelperText
								sx={{
									height: "16px",
									color: "red",
									visibility: `${getVisibility(authError)}`,
								}}
							>
								{authError}
							</FormHelperText>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
