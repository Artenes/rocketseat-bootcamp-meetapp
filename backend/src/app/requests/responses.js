export function badRequest(message) {
  return { status: 400, error: message };
}

export function unauthorized(message) {
  return { status: 401, error: message };
}

export function notFound(message) {
  return { status: 404, error: message };
}
