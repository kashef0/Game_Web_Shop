import { Box, Heading, Text, Stack } from "@chakra-ui/react";

const Terms = () => {
  return (
    <Box maxW="800px" mx="auto" mt={10} p={6}>
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={6}
        boxShadow="md"
      >
        <Heading mb={4}>Terms and Conditions</Heading>
        <Stack gap={4} fontSize="sm">
          <Text>
            These Terms and Conditions govern your use of GameHub's online store.
            By accessing or using our website, you agree to be legally bound by these terms.
          </Text>

          <Heading size="md" mt={4}>1. Account Registration</Heading>
          <Text>
            You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your login credentials and any activity under your account.
          </Text>

          <Heading size="md" mt={4}>2. Orders and Payment</Heading>
          <Text>
            When placing an order, you agree that all information provided is accurate and complete.
            All prices are listed in your local currency and include applicable taxes unless stated otherwise.
            Payment is processed securely via third-party providers.
          </Text>

          <Heading size="md" mt={4}>3. Refunds and Returns</Heading>
          <Text>
            We offer refunds only in accordance with our refund policy. Digital game purchases are non-refundable once downloaded or activated unless defective. Rental items must be returned in acceptable condition.
          </Text>

          <Heading size="md" mt={4}>4. User Conduct</Heading>
          <Text>
            You agree not to use our service for any unlawful or unauthorized purpose. This includes violating copyright laws, distributing pirated content, or attempting to access restricted areas of the website.
          </Text>

          <Heading size="md" mt={4}>5. Intellectual Property</Heading>
          <Text>
            All trademarks, product names, and content on this site are the property of their respective owners. You may not reproduce, distribute, or modify any part of our website without written permission.
          </Text>

          <Heading size="md" mt={4}>6. Service Availability</Heading>
          <Text>
            We strive to keep our service available at all times but do not guarantee uninterrupted access. We reserve the right to modify or discontinue the site at any time.
          </Text>

          <Heading size="md" mt={4}>7. Limitation of Liability</Heading>
          <Text>
            GameHub is not liable for any indirect, incidental, or consequential damages arising from your use of the service. Use is at your own risk.
          </Text>

          <Heading size="md" mt={4}>8. Changes to Terms</Heading>
          <Text>
            We may update these terms occasionally. Your continued use of the site means you accept the updated terms.
          </Text>

          <Text mt={4}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Terms;
