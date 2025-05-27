import { useState, useEffect, useRef } from "react";
import { getBotResponse } from "../utils/chatbotLogic";
import {
  Box,
  Button,
  IconButton,
  Input,
  HStack,
  Badge,
  Collapsible,
} from "@chakra-ui/react";
import { FiMessageSquare } from "react-icons/fi";
import { keyframes } from "@emotion/react";

// definierar en pulse animation som förstorar och minskar ikonen
const pulse = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([
    "Bot: Hi! How can I help you today?\n\nYou can ask about:\n• Shipping / Delivery\n• Returns / Refunds / Cancel Order\n• Payments / Payment Methods\n• Game Recommendations (PS5, Xbox, PC)\n• Order Status / Tracking\n• Account / Login / Register\n• Gift Cards / Vouchers\n• Support / Problems\n• Something else? Just ask!",
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [pulseOn, setPulseOn] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

   // funktion som scrollar chatten till botten när meddelanden läggs till eller chatten öppnas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

     // hanterar puls animationens status på eller av var 5 sekund när chatten är stängd
  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) {
        setPulseOn((prev) => !prev); // Växlar puls på och av
      } else {
        setPulseOn(false); // Stoppar puls när chatten är öppen
      }
    }, 5000); // Intervallet på 5 sekunder

    return () => clearInterval(interval);
  }, [open]);

  // skickar användarens meddelande och får svar från botten
  const handleSend = () => {
    const userMsg = input.trim();
    if (!userMsg) return;
    const botReply = getBotResponse(userMsg);
    setMessages((prev) => [...prev, `You: ${userMsg}`, `Bot: ${botReply}`]);
    setInput("");
  };

  return (
    <>
      <IconButton
        aria-label="Toggle Chat"
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="tooltip"
        borderRadius="full"
        width="50px"
        height="50px"
        colorScheme="blue"
        onClick={() => {
          setOpen(!open);
          setPulseOn(false);
        }}
        animation={pulseOn ? `${pulse} 3s ease-in-out 10` : "none"}
      >
        <FiMessageSquare size="20" />
      </IconButton>

      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Content>
          <Box
            position="fixed"
            bottom="80px"
            right="20px"
            width="320px"
            maxHeight="400px"
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            zIndex={1050}
            display="flex"
            flexDirection="column"
          >
            <Box
              bg="blue.600"
              color="white"
              px={4}
              py={2}
              fontWeight="bold"
              borderTopRadius="md"
            >
              Chat Support
            </Box>

            <Box
              flex="1"
              overflowY="auto"
              px={4}
              py={2}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              {messages.map((msg, i) => {
                const isUser = msg.startsWith("You:");
                return (
                  <Box key={i} textAlign={isUser ? "right" : "left"}>
                    <Badge
                      colorScheme={isUser ? "blue" : "gray"}
                      whiteSpace="pre-wrap"
                      px={3}
                      py={1}
                      borderRadius="md"
                    >
                      {msg}
                    </Badge>
                  </Box>
                );
              })}
              <div ref={messagesEndRef} />
            </Box>

            <Box px={4} py={3} borderTop="1px solid" borderColor="gray.200">
              <HStack gap={2}>
                <Input
                  placeholder="Ask a question..."
                  value={input}
                  color="black"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  autoFocus
                />
                <Button
                  bgColor="blue.500"
                  color="white"
                  variant="solid"
                  onClick={handleSend}
                >
                  Send
                </Button>
              </HStack>
            </Box>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
};

export default ChatBot;
