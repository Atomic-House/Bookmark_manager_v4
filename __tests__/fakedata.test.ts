import { generateUserData } from "@/functions/fakedata";
import "@testing-library/jest-dom";
test("generates fake data", () => {
  console.log(generateUserData(10));

  expect(generateUserData(10));
});
