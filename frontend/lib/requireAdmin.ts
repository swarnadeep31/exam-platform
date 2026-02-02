export function isAdmin() {
  return typeof window !== "undefined" &&
    Boolean(localStorage.getItem("adminToken"));
}
