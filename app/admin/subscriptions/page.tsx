"use client";

import React, { useState, useEffect, useCallback } from "react";
import SubsTableItem from "@/Components/adminComponents/SubsTableItem";
import axios from "axios";
import { toast } from "react-toastify";

interface EmailData {
  _id: string;
  email: string;
}

const Page: React.FC = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/email`
    : "/api/email";

  console.log("API URL:", API_URL); // Debugging

  // Wrap fetchEmails in useCallback
  const fetchEmails = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const deleteEmail = async (mongoId: string) => {
    try {
      const response = await axios.delete(API_URL, {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      } else {
        toast.error("Error deleting email.");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Error deleting email.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:pt-28 flex-1 pt-28 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-b from-blue-800 to-black min-h-screen text-white">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border-2 border-white scrollbar-hide">
        <table className="w-full text-sm text-white">
          <thead className="text-xs text-left text-white uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">Email Subscription</th>
              <th scope="col" className="px-6 py-3">Action</th>
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
