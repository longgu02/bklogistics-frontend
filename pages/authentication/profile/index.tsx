import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";

export interface UserData {
  name: string;
  email: string;
  phone: string;
}

const Profile = (): ReactElement => {
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 555-1212",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState<keyof UserData>("name");

  const handleEditClick = (field: keyof UserData) => {
    setEditField(field);
    setEditDialogOpen(true);
  };

  const handleSaveChanges = (newValue: keyof UserData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [editField]: newValue,
    }));
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <PageContainer title="Profile" description="Profile page">
        <div>
          <DashboardCard title="Profile">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 96, height: 96 }}>JD</Avatar>
              <Box sx={{ ml: 2 }}>
                <h1>{userData.name}</h1>
                <p>{userData.email}</p>
                <p>{userData.phone}</p>
              </Box>
            </Box>

            <List sx={{ mt: 4 }}>
              <ListItem
                component="button"
                onClick={() => handleEditClick("name")}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"Name"} secondary={userData.name} />
              </ListItem>
              <ListItem
                component="button"
                onClick={() => handleEditClick("email")}
              >
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={"Email"} secondary={userData.email} />
              </ListItem>
              <ListItem
                component="button"
                onClick={() => handleEditClick("phone")}
              >
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={"Phone"} secondary={userData.phone} />
              </ListItem>
            </List>

            <Dialog open={editDialogOpen} onClose={handleCancel}>
              <DialogTitle>Edit {editField}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label={editField}
                  type="text"
                  fullWidth
                  onChange={(event) =>
                    setEditField(event.target.value as keyof UserData)
                  }
                />
              </DialogContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleCancel} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveChanges(editField)}>
                  Save Changes
                </Button>
              </Box>
            </Dialog>
          </DashboardCard>
        </div>
      </PageContainer>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};