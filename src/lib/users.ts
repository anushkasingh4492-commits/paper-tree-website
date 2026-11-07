import bcrypt from "bcryptjs";

export interface InstituteUser {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hash
  instituteSlug: string;
  instituteName: string;
  role: "admin" | "staff" | "student";
}

const ADMIN_HASH =
  "$2b$10$QHE07XtV.9/Ok89aEv7wAOzNrXzztP3.AMdF/0mGajpJQjELOYTua";
const STUDENT_HASH =
  "$2b$10$lg27X11x5ZBrNRZqDQ7Zf.PJWfAhtOYSiFN.LNSqajdLBiUkNUXsq";

/**
 * Demo / seeded users. Two institutes, each with an admin and a student.
 * In production, replace this in-memory store with a real database.
 */
export const USERS: InstituteUser[] = [
  {
    id: "1",
    name: "Vigyaan Admin",
    email: "admin@vigyaan.ac.in",
    password: ADMIN_HASH,
    instituteSlug: "vigyaan",
    instituteName: "Vigyaan Academy",
    role: "admin",
  },
  {
    id: "2",
    name: "Vigyaan Student",
    email: "student@vigyaan.ac.in",
    password: STUDENT_HASH,
    instituteSlug: "vigyaan",
    instituteName: "Vigyaan Academy",
    role: "student",
  },
  {
    id: "3",
    name: "Infinity Admin",
    email: "admin@infinity.classes.in",
    password: ADMIN_HASH,
    instituteSlug: "infinity",
    instituteName: "Infinity Classes",
    role: "admin",
  },
  {
    id: "4",
    name: "Infinity Student",
    email: "student@infinity.classes.in",
    password: STUDENT_HASH,
    instituteSlug: "infinity",
    instituteName: "Infinity Classes",
    role: "student",
  },
];

export function findUserByEmail(email: string): InstituteUser | undefined {
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): InstituteUser | undefined {
  return USERS.find((u) => u.id === id);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}