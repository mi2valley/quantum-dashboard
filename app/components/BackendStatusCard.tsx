import { useState } from 'react';
import { Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface BackendStatusCardProps {
  backend_name: string;
  queue_length?: number;
  status: string;
}

const BackendStatusCard: React.FC<BackendStatusCardProps> = ({ backend_name, status, queue_length }) => {
  const [isChanged, setIsChanged] = useState(false); // To track if status has changed
  const bgColor = useColorModeValue(isChanged ? "gray.200" : "white", isChanged ? "gray.700" : "gray.800");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      maxWidth="250px"
      bg={bgColor}
      boxShadow="sm"
      transition="0.3s"
      _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
    >
      <Text fontWeight="bold" fontSize="lg" mb={3}>
        {backend_name}
      </Text>
      <Text>{queue_length}</Text>
      <Text>
        <Icon
          as={status === "True" ? FaCheck : FaTimes}
          color={status === "True" ? "green.500" : "red.500"}
          mr={2}
        />
        Status: {status}
      </Text>
    </Box>
  );
};

export default BackendStatusCard;
