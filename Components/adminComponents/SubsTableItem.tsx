import React from "react";

interface SubsTableItemProps {
  email?: string;
  mongoId: string;
  deleteEmail: (mongoId: string) => Promise<void>;
}

const SubsTableItem: React.FC<SubsTableItemProps> = ({ email, mongoId, deleteEmail }) => {
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email || "No Email"} {/* Default text if email is undefined */}
      </th>
      <td
        className="px-6 py-4 cursor-pointer text-red-500 hover:underline"
        onClick={() => deleteEmail(mongoId)}
      >
        Delete
      </td>
    </tr>
  );
};

export default SubsTableItem;
