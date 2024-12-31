"use client";

import React, { useState, useEffect } from "react";
import SubsTableItem from "@/Components/adminComponents/SubsTableItem";
import axios from "axios";
import { toast } from "react-toastify";

interface EmailData {
  _id: string;
  email: string;
}

const Page: React.FC = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch emails from API
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete email by ID
  const deleteEmail = async (mongoId: string) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails(); // Refresh email list
      } else {
        toast.error("Error deleting email.");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Error deleting email.");
    }
  };

  // Fetch emails on mount
  useEffect(() => {
    fetchEmails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-500 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubsTableItem
                key={item._id}
                mongoId={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
