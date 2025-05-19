// components/PrivacyPolicy.tsx
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} border="1px solid" borderColor="gray.300" borderRadius="md">
      <Heading mb={4}>Privacy Policy</Heading>
      <Stack gap={4} fontSize="sm">
        <Text>
          This privacy policy explains how GameHub collects, uses, and protects your personal data when you use our webshop.
        </Text>

        <Heading size="md" mt={4}>1. Data We Collect</Heading>
        <Text>
          - Name, email address, and shipping address when you register or place an order.  
          - Payment information (handled securely by third-party providers).  
          - Your game preferences and cart activity.  
          - Device and browser info for analytics and security.
        </Text>

        <Heading size="md" mt={4}>2. How We Use Your Data</Heading>
        <Text>
          - To fulfill orders and deliver digital/rental products.  
          - To contact you about your order or support requests.  
          - To personalize your experience and show relevant products.  
          - For internal analytics and site improvements.
        </Text>

        <Heading size="md" mt={4}>3. Cookies</Heading>
        <Text>
          We use cookies to store preferences, track sessions, and gather anonymous usage stats. You can disable cookies in your browser settings.
        </Text>

        <Heading size="md" mt={4}>4. Data Sharing</Heading>
        <Text>
          We do not sell or share your personal data with third parties, except:  
          - With trusted services (e.g., payment processors, hosting platforms)  
          - If required by law or to protect our rights
        </Text>

        <Heading size="md" mt={4}>5. Your Rights</Heading>
        <Text>
          - You can request access to, correction, or deletion of your data.  
          - Contact us at privacy@gamehub.com for any data-related requests.
        </Text>

        <Heading size="md" mt={4}>6. Security</Heading>
        <Text>
          We use encryption (SSL), limited access, and secure third-party services to protect your data.
        </Text>

        <Heading size="md" mt={4}>7. Changes</Heading>
        <Text>
          We may update this policy as needed. Any changes will be published on this page.
        </Text>

        <Text mt={4}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </Stack>
    </Box>
  );
};

export default PrivacyPolicy;
