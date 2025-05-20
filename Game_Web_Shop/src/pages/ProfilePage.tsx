
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Button, Text, Image, Stack, Heading, Spinner, Field } from '@chakra-ui/react';
import usePut from '@/hooks/usePut';
import { RootState } from '@/store/store';
import { loginSuccess, updateUserProfile } from '@/store/Slices/authSlice';
import useGet from '@/hooks/useGet';
import { User } from '@/types/auth';

const ProfilePage = () => {
  const API_URL = import.meta.env.VITE_DATABASE_API_URL;
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { loading, error, updateData } = usePut(`${API_URL}/api/users/update_profile`);
  const {data, fetchData} = useGet<User>(`${API_URL}/api/users/profile`, loading, '', token || '');
  const [success, setSuccess] = useState<string | null>(null);
  console.log("data: ", data)
  console.log("user: ", user)
  // Sätta initialt namn när användarens data finns
  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  useEffect(() => {
        fetchData()
  }, [loading])

  // Uppdaterar vald fil i state när användaren väljer en ny bild
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };
  // Skickar uppdaterad användarinfo till servern
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess(" ");
  
    const formData = new FormData();
    if (name !== user?.name) formData.append('name', name); // Endast om nytt namn
    if (password) formData.append('password', password); // Om nytt lösenord
    if (file) formData.append('profilePic', file); // Om ny profilbild
    try {
      const updatedUser = await updateData(formData); // Skickar PUT förfrågan
      if (updatedUser && token) {
        setSuccess("Profile updated successfully!");
        dispatch(updateUserProfile(updatedUser.user));
        dispatch(loginSuccess({
          ...updatedUser.data,
          token,
        }));

      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) return <Spinner size="xl" />; // visa loading spinner

  return (
    <Box maxW="md" mx="auto" p={6}>
      <Heading as="h1" mb={6} textAlign="center">
        Update Profile
      </Heading>
      <form onSubmit={handleSubmit}>
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
            <Field.Label>Profile Picture</Field.Label>
            <Input type="file" onChange={handleFileChange} />
            {user.profilePic && (
              <Box mt={4}>
                <text>current profile picture: </text>
                <Image src={user.profilePic} alt="Profile" rounded='full' boxSize="250px" objectFit="cover" />
              </Box>
            )}
          </Field.Root>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="teal"
            loading={loading}
            loadingText="Updating"
            size="lg"
            width="full"
          >
            Update Profile
          </Button>
        </Stack>
        
        {success && <Text color='green.400' paddingY={2}>{success}</Text>}

        {/* Error Message */}
        {error && <Text color="red.500" mt={4}>{error}</Text>}
      </form>
    </Box>
  );
};

export default ProfilePage;
