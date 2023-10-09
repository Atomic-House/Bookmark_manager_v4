import _ from "lodash";
test("Unique array", () => {
  const arr = [
    "a@mail.com",
    "a@mail.com",
    "b@gai.com",
    "c@maill.com",
    "c@maill.com",
  ];
  console.log(_.uniq(arr));

  // expect(_.uniq(arr)).toStrictEqual(["a@mail.com", "b@gai.com", "c@maill.com"]);
});
