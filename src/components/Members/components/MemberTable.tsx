"use client";
import { generateUserData } from "@/functions/fakedata";
import { Image } from "@chakra-ui/react";
// import Image from "next/image";
export default function MemberTable() {
  const userData = generateUserData(6);
  return (
    <div>
      <table className="table">
        <thead>
          <tr className="text-[#A3AED0]">
            {tableHeading.map((heading) => (
              <th className="font-normal mx-8 text-left" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr className="font-semibold" key={user.name}>
              <td>
                <img
                  width={60}
                  height={60}
                  className="avatar rounded-full w-20 mx-2"
                  src={user.image}
                  alt={user.name}
                />{" "}
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.userName}</td>
              <td>{user.joinedAt}</td>
              <td>{user.role}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeading = [
  "NAME",
  "EMAIL",
  "USER NAME",
  "JOIN DATE",
  "USER TYPE",
  "SETTINGS",
];
