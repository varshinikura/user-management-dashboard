import { describe, expect, it } from "vitest";
import { validateUser } from "./validation";

describe("validateUser", () => {
  it("returns errors for empty fields", () => {
    const errors = validateUser({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

    expect(errors.firstName).toBe("First Name is required");
    expect(errors.lastName).toBe("Last Name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.department).toBe("Department is required");
  });

  it("returns error for invalid email", () => {
    const errors = validateUser({
      firstName: "Varshini",
      lastName: "Kura",
      email: "wrongemail",
      department: "IT",
    });

    expect(errors.email).toBe("Please enter a valid email");
  });

  it("returns no errors for valid user", () => {
    const errors = validateUser({
      firstName: "Varshini",
      lastName: "Kura",
      email: "varshini@example.com",
      department: "IT",
    });

    expect(errors).toEqual({});
  });
});