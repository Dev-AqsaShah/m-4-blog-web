"use client";

import React, { useState, useEffect, useCallback } from "react";
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
    if (!window.confirm("Are you sure you want to delete this email?")) return;

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
    <div className="lg:pt-28 p-5 sm:p-12 pt-24 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-2">
        📩 All Subscriptions
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700 max-w-[600px]">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Email Subscription</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {emails.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-800 transition-colors duration-150"
              >
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <button
                    onClick={() => deleteEmail(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
            {emails.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
