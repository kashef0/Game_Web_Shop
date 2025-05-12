import usePost from "@/hooks/usePost";
import { loginSuccess, registerSuccess } from "@/store/Slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { AuthLogin } from "@/types/auth";
import { validateEmail, validatePassword } from "@/utils/validators";

interface AuthFormProps {
  isLogin: boolean; // kolla om formuläret är för inloggning eller registrering
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const dispatch = useDispatch(); // Skapar dispatch funktion för att skicka actions till Redux
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL;

  // Använd usePost hook för att hantera inloggning och registrera POST förfrågningar
  const {
    postData,
    error: postError,
    loading,
  } = usePost<any>(
    isLogin ? `${BASE_URL}/api/auth/login` : `${BASE_URL}/api/auth/register`
  );

  useEffect(() => {
    setError("");
  }, [name, email, password]);

  // Hanterar formulären och submit händelse
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setConfirmPasswordError("");

    if (!isLogin && !validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Your confirmed password doesn't match");
      return;
    }

    if (!isLogin && !validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      let response;

      if (isLogin) {
        response = await postData({ email, password }); // Post loginnig data
      } else {
        response = await postData({ name, email, password }); // Post registrating data
      }
      if (!response) {
        setError(postError || "Could not retrieve data.");
        return;
      }
      if (response && isLogin) {
        if (response.role !== "user") {
          setError("You do not have permission to log in here.");
          return;
        }

        // Skapar user objekt och sparar i localStorage och Redux
        const user: AuthLogin = {
          id: response._id,
          name: response.name,
          email: response.email,
          role: response.role,
          profilePic: response.profilePic,
        };
        const token = response.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("username", user.name);
        localStorage.setItem("email", user.email);
        dispatch(loginSuccess(user));
        navigate("/");
      }

      // Hanterar register svar
      if (!isLogin && response) {
        const { user } = response;
        dispatch(registerSuccess(user));
        setSuccess("Account created successfully! Log in now.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
      alert(error);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box
        maxW="md"
        w="full"
        p={6}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        borderRadius="lg"
      >
        <Heading size="lg" textAlign="center" color="gray.800" mb={6}>
          {isLogin ? "Log in" : "Create account"}
        </Heading>

        {success && (
          <Text color="green.500" fontSize="sm" textAlign="center" mb={4}>
            {success}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {!isLogin && (
              <Field.Root required>
                <Field.Label fontSize="sm" fontWeight="semibold">
                  User name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  variant="subtle"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your username"
                />
              </Field.Root>
            )}

            <Field.Root required>
              <Field.Label fontSize="sm" fontWeight="semibold">
                E-post
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                variant="subtle"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label fontSize="sm" fontWeight="semibold">
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                variant="subtle"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Field.Root>

            {!isLogin && (
              <Field.Root required>
                <Field.Label fontSize="sm" fontWeight="semibold">
                  Confirm Password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  variant="subtle"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                />
              </Field.Root>
            )}

            {error && (
              <Text color="red.500" fontSize="sm" alignSelf="start">
                {error}
              </Text>
            )}
            {confirmPasswordError && (
              <Text color="red.500" fontSize="sm" alignSelf="start">
                {confirmPasswordError}
              </Text>
            )}

            <Button
              type="submit"
              width="full"
              colorScheme="blue"
              variant="solid"
            >
              {isLogin
                ? loading
                  ? "Logging..."
                  : "Log in"
                : loading
                ? "Creating..."
                : "Create account"}
            </Button>
          </VStack>
        </form>

        <Box textAlign="center" mt={4}>
          <Text fontSize="sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/register" : "/login"}
              color="blue.500"
              _hover={{ color: "blue.600", textDecoration: "underline" }}
            >
              {isLogin ? "Create account" : "Log in"}
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;
