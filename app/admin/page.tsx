"use client";

import { useState } from "react";

interface AdminRequest {
  id: number;
  name: string;
  status: string;
}

const AdminPage = () => {
  const [requests, setRequests] = useState<AdminRequest[]>([
    { id: 1, name: "John Doe", status: "pending" },
    { id: 2, name: "Jane Smith", status: "pending" },
    { id: 3, name: "Bob Johnson", status: "pending" },
  ]);

  const handleAccept = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id == id
          ? {
              ...req,
              status: "accept",
            }
          : req,
      ),
    );
  };

  const handleReject = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "rejected",
            }
          : req,
      ),
    );
  };

  let currentReq = requests.find((req) => req.status === "pending");

  if (!currentReq) {
    currentReq = requests.find((req) => req.status === "rejected");

    if (!currentReq) {
      return (
        <div>
          <p>No more pending requests.</p>
        </div>
      );
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Request</h1>
      <div className="border p-4 rounded">
        <div className="mt-4 space-x-2 flex justify-center items-center gap-4">
          <button
            onClick={() => handleAccept(currentReq.id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <p>Name: {currentReq.name}</p>
          <p>Status: {currentReq.status}</p>
          <button
            onClick={() => handleReject(currentReq.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
