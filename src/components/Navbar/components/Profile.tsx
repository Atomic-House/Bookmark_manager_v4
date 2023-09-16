import { faker } from "@faker-js/faker";

export default function Profile() {
  return (
    <div className="dropdown">
      <div className="avatar" tabIndex={0}>
        <div className="w-12 rounded-full flex items-center">
          <img src={faker.image.url()} alt="image" width={40} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}
