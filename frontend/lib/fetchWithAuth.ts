type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function fetchWithAuth(
  url: string,
  options: FetchOptions = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  // ✅ Force headers to be a plain object
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (!options.skipAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Auto logout on unauthorized
  if (response.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }

  return response;
}
