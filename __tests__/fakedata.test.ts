import { generateFakeData } from "@/functions/fakedata";
import "@testing-library/jest-dom";
test("generates fake data", () => {
  console.log(generateFakeData(10));

  expect(generateFakeData(10));
});
