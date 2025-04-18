function handler({ name, email, service, message }) {
  if (!name || !email || !service || !message) {
    return {
      status: 400,
      error: "All fields are required",
    };
  }

  if (!email.includes("@")) {
    return {
      status: 400,
      error: "Invalid email address",
    };
  }

  return {
    status: 200,
    message: "Message received successfully",
  };
}
export async function POST(request) {
  return handler(await request.json());
}