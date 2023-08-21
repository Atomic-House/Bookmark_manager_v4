import { BiChevronDown } from "@react-icons/all-files/bi/BiChevronDown";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
export default function AddMember() {
  return (
    <div>
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn m-1 bg-[#422AFB] text-white rounded-full "
        >
          + Add Members <BiChevronDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <span>
              <FiUser />
              Single
            </span>
          </li>
          <li>
            <span>
              <FiUsers />
              Multiple
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
