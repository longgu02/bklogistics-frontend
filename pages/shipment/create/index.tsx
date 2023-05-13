import { Box, Typography, TextField } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";

const CreateShipment = () => {
	return (
		<PageContainer title="Create Shipment" description="Create Shipment page">
			<DashboardCard title="Create Shipment">
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						<TextField
							error
							id="outlined-error"
							label="Error"
							defaultValue="Hello World"
						/>
						<TextField
							error
							id="outlined-error-helper-text"
							label="Error"
							defaultValue="Hello World"
							helperText="Incorrect entry."
						/>
					</div>
					<div>
						<TextField
							error
							id="filled-error"
							label="Error"
							defaultValue="Hello World"
							variant="filled"
						/>
						<TextField
							error
							id="filled-error-helper-text"
							label="Error"
							defaultValue="Hello World"
							helperText="Incorrect entry."
							variant="filled"
						/>
					</div>
					<div>
						<TextField
							error
							id="standard-error"
							label="Error"
							defaultValue="Hello World"
							variant="standard"
						/>
						<TextField
							error
							id="standard-error-helper-text"
							label="Error"
							defaultValue="Hello World"
							helperText="Incorrect entry."
							variant="standard"
						/>
					</div>
				</Box>
			</DashboardCard>
		</PageContainer>
	);
};

export default CreateShipment;

CreateShipment.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
