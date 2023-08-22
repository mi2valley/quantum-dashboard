import { Button, SimpleGrid, Heading, Icon } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import BackendStatusCard from "./BackendStatusCard";

interface BackendStatusSectionProps {
  title: string;
  colorScheme: string;
  fetchStatus: () => void;
  statusList: { backend_name: string; queue_length?: number; status: string }[];
}

const BackendStatusSection: React.FC<BackendStatusSectionProps> = ({ title, colorScheme, fetchStatus, statusList }) => {
  return (
    <div>
      <Heading mb={5}>{title} Backend Status</Heading>
      <Button onClick={fetchStatus} colorScheme={colorScheme} my={4} leftIcon={<Icon as={FaSync} />}>
        Update
      </Button>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {statusList.map((info) => (
          <BackendStatusCard key={info.backend_name} backend_name={info.backend_name} status={info.status} queue_length={info.queue_length}/>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default BackendStatusSection;
