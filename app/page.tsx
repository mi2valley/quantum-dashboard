"use client";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import BackendStatusSection from "./components/BackendStatusSection";

export default function Home() {
  const [ibmQStatus, setIbmQStatus] = useState<{ backend_name: string; status: string }[]>([]);
  const [ionqStatus, setIonqStatus] = useState<{ backend_name: string; status: string }[]>([]);
  const [xanaduStatus, setXanaduStatus] = useState<{ backend_name: string; status: string }[]>([]);
  const [rigettiStatus, setRigettiStatus] = useState<{ backend_name: string; status: string }[]>([]);
  const [queraStatus, setQueraStatus] = useState<{ backend_name: string; status: string }[]>([]);

  const fetchIbmQStatus = () => {
    fetch("/api/status/ibmq")
      .then((response) => response.json())
      .then((data) => setIbmQStatus(data.ibmq_status));
  };

  const fetchIonqStatus = () => {
    fetch("/api/status/ionq")
      .then((response) => response.json())
      .then((data) => setIonqStatus(data.ionq_info));
  };

  const fetchXanaduStatus = () => {
    fetch("/api/status/xanadu")
      .then((response) => response.json())
      .then((data) => setXanaduStatus(data.xanadu_info));
  };

  const fetchRigettiStatus = () => {
    fetch("/api/status/rigetti")
      .then((response) => response.json())
      .then((data) => setRigettiStatus(data.rigetti_info));
  };

  const fetchQueraStatus = () => {
    fetch("/api/status/quera")
      .then((response) => response.json())
      .then((data) => setQueraStatus(data.quera_info));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box w="full">
        <BackendStatusSection title="IBM" colorScheme="blue" fetchStatus={fetchIbmQStatus} statusList={ibmQStatus} />
        <BackendStatusSection title="IonQ" colorScheme="green" fetchStatus={fetchIonqStatus} statusList={ionqStatus} />
        <BackendStatusSection title="Xanadu" colorScheme="pink" fetchStatus={fetchXanaduStatus} statusList={xanaduStatus} />
        <BackendStatusSection title="Rigetti" colorScheme="orange" fetchStatus={fetchRigettiStatus} statusList={rigettiStatus} />
        <BackendStatusSection title="Quera" colorScheme="purple" fetchStatus={fetchQueraStatus} statusList={queraStatus} />
      </Box>
    </main>
  );
}
