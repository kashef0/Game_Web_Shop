import {
  Box,
  Heading,
  Text,
  Spinner,
  Stack,
  Button,
  Textarea,
  Input,
  Field,
  Separator,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";

import { Message } from "../types/Message";
import { RootState } from "@/store/store";
import { setLoading, setMessage } from "@/store/Slices/messageSlice";

const UserInbox = () => {
  const dispatch = useDispatch();
  // Hämtar användarens token från auth statet
  const { token } = useSelector((state: RootState) => state.auth);
  // Hämtar meddelanden och laddningsstatus från message statet
  const { messages, loading: messageLoading } = useSelector((state: RootState) => state.message);

// Lokal state för lyckade svar och formulärfält
  const [successMessage, setSuccessMessage] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const Database_API_URL = import.meta.env.VITE_DATABASE_API_URL;
  // Hook för att hämta användarens inkorg
  const {
    data: messagesData,
    error: fetchError,
    loading: fetchLoading,
    fetchData
  } = useGet<Message[]>(
    `${Database_API_URL}/api/message/inbox`,
    true,
    "",
    token || ""
  );
  // Hook för att skicka ett nytt meddelande
  const {
    error: postError,
    loading: postLoading,
    postData: sendNewMessage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = usePost<any>(`${Database_API_URL}/api/message/send`);

  // När Redux state säger att det laddas hämta inkorgen
    useEffect(() => {
    if (messageLoading) {
      fetchData()
      dispatch(setLoading(false));
    }
  }, [messageLoading, successMessage])
  
  // Om nya meddelanden hämtats uppdatera Redux
  useEffect(() => {
    if (messagesData) {
      dispatch(setMessage(messagesData))
    }
  }, [messagesData]);

  // Gruppera meddelanden per användare
  const groupedMessages = messages.reduce<Record<string, Message[]>>(
    (acc, msg) => {
      const key = msg.userId._id || msg._id;
      if (!acc[key]) acc[key] = [];
      acc[key].push(msg);
      return acc;
    },
    {}
  );
// hantera när användaren skickar nytt meddelande
  const handleNewMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    await sendNewMessage({ subject: newSubject, message: newMessage });
    setNewSubject("");
    setNewMessage("");
    setSuccessMessage("Message sent successfully.");
    
    const timeout = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timeout);
  };

  const handleOpenMessage = () => {
    setIsOpen(!isOpen);
  };

  if (fetchLoading)
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" />
        <Text mt={4}>Downloading messages...</Text>
      </Box>
    );

  if (fetchError)
    return (
      <Box textAlign="center" mt={8}>
        <Text color="red.500" fontWeight="bold">
          Error bring: {fetchError}
        </Text>
      </Box>
    );

  return (
    <>
      <Box maxW="container.md" mx="auto" mt={8} px={4}>
        <Button
          marginBottom={2}
          variant="solid"
          colorPalette="blue"
          onClick={() => handleOpenMessage()}
        >
          Create a new message
        </Button>
        {isOpen && (
          <>
            <Heading as="h2" mb={6}>
              Send a new message
            </Heading>
            <Box as="form" onSubmit={handleNewMessageSubmit} mb={8}>
              <Field.Root required mb={4}>
                <Field.Label>Subject</Field.Label>
                <Input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="type subject"
                  disabled={postLoading}
                />
              </Field.Root>
              <Field.Root required mb={4}>
                <Field.Label>Message</Field.Label>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="type your message"
                  rows={4}
                  disabled={postLoading}
                />
              </Field.Root>
              <Button
                type="submit"
                colorPalette="teal"
                variant="solid"
                loading={postLoading}
              >
                {postLoading ? "Sending message.." : "Send message"}
              </Button>
              {successMessage && (
                <Text color="green.500" mt={2}>
                  {successMessage}
                </Text>
              )}

              {postError && (
                <Text color="red.500" mt={2}>
                  Error sending: {postError}
                </Text>
              )}
            </Box>
          </>
        )}
        <Separator />

        <Heading as="h2" mb={6} marginY={7}>
          Your message
        </Heading>

        {messages.length === 0 ? (
          <Text>You don't have any messages.</Text>
        ) : (
          <Stack gap={6}>
            {Object.entries(groupedMessages).map(
              ([threadId, threadMessages]) => (
                <Box
                  key={threadId}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="sm"
                  overflow="hidden"
                >
                  <Box bg="blue.600" color="white" px={4} py={3}>
                    <Heading size="md">
                      Your quastion: {threadMessages[0].subject}
                    </Heading>
                  </Box>
                  <Box px={4} py={4}>
                    <Stack gap={4}>
                      {threadMessages
                        .sort(
                          (a, b) =>
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime()
                        )
                        .map((msg) => (
                          <Box
                            key={msg._id}
                            w="100%"
                            borderBottom="1px solid"
                            borderColor="gray.200"
                            pb={2}
                          >
                            <Text>
                              <Text as="span" fontWeight="bold">
                                message:
                              </Text>{" "}
                              {msg.message}
                            </Text>
                            <Text>
                              <Text as="span" fontWeight="bold">
                                Admin answer:
                              </Text>{" "}
                              {msg.adminReply ? (
                                <Text color="green.600">{msg.adminReply}</Text>
                              ) : (
                                <Text color="red.500" fontStyle="italic">
                                  Not answered yet
                                </Text>
                              )}
                            </Text>
                            <Text fontSize="sm">
                              Sent: {new Date(msg.createdAt).toLocaleString()}
                            </Text>
                          </Box>
                        ))}
                    </Stack>
                  </Box>
                </Box>
              )
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default UserInbox;
