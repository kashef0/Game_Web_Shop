import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Input,
  Text,
  Image,
  Stack,
  Heading,
  Spinner,
  Field,
  FileUpload,
  Icon,
} from "@chakra-ui/react";
import usePut from "@/hooks/usePut";
import { RootState } from "@/store/store";
import {
  loginSuccess,
  logout,
  updateUserProfile,
} from "@/store/Slices/authSlice";
import { LuUpload } from "react-icons/lu";
import useDelete from "@/hooks/useDelete";
import ActionButton from "@/components/DeleteButton";

const ProfilePage = () => {
  const API_URL = import.meta.env.VITE_DATABASE_API_URL;
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth!);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { deleteData, loading: deleteLoading } = useDelete(
    `${API_URL}/api/users/delete_profile`
  );

  const deleteMyAccount = async () => {
    if (!user?.id) return;
    deleteData(user.id);
  };

  const { loading, error, updateData } = usePut(
    `${API_URL}/api/users/update_profile`
  );

  // Sätta initialt namn när användarens data finns
  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Uppdaterar vald fil i state när användaren väljer en ny bild
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };
  // Skickar uppdaterad användarinfo till servern
  const handleSubmit = async () => {

    const formData = new FormData();
    if (name !== user?.name) formData.append("name", name);
    if (password) formData.append("password", password);
    if (file) formData.append("profilePic", file);

    try {
      const updatedUser = await updateData(formData);
      if (updatedUser && token) {
        dispatch(updateUserProfile(updatedUser.user));
        dispatch(loginSuccess({ ...updatedUser.data, token }));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!user) return <Spinner size="xl" />; // visa loading spinner

  return (
    <Box maxW="md" mx="auto" p={6}>
      <Heading as="h1" mb={6} textAlign="center">
        Update Profile
      </Heading>
      <Box as="section">
        <Stack gap={4}>
          {/* Name Field */}
          <Field.Root id="name" required>
            <Field.Label>Name</Field.Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Field.Root>

          {/* Password Field */}
          <Field.Root id="password">
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
            />
          </Field.Root>

          {/* Profile Picture Field */}
          <Field.Root id="profilePic">
            <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}>
              <FileUpload.HiddenInput onChange={handleFileChange} />
              <FileUpload.Dropzone>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
              <FileUpload.List showSize clearable />
            </FileUpload.Root>
            {user.profilePic && (
              <Box mt={4}>
                <text>current profile picture: </text>
                <Image
                  src={user.profilePic}
                  alt="Profile"
                  rounded="full"
                  boxSize="250px"
                  objectFit="cover"
                />
              </Box>
            )}
          </Field.Root>

          {/* update Button */}
          <ActionButton
            actionFn={handleSubmit}
            isLoading={loading}
            label="Update Profile"
            colorScheme="teal"
            successMessage="Profile updated successfully."
            errorMessage="Failed to update your profile."
          />
          {/* delete Button */}
          <ActionButton
            actionFn={deleteMyAccount}
            isLoading={deleteLoading}
            label="Delete My Account"
            colorScheme="red"
            confirmationText="Are you sure you want to permanently delete your account?"
            successMessage="Account deleted successfully."
            errorMessage="Failed to delete your account."
            onSuccess={() => dispatch(logout())}
          />
        </Stack>

        {/* Error Message */}
        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
