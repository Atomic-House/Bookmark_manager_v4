"use client";
import { fakerUser } from "@/functions/fakedata";
import Image from "next/image";
export default function MemberTable() {
  const userData = fakerUser(9);
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
                <Image
                  width={60}
                  height={60}
                  className="avatar rounded-full w-20 mx-2"
                  src={user.image!}
                  alt={user.name!}
                />{" "}
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.emailVerified?.toString()!}</td>
              <td>{"Member"}</td>
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
