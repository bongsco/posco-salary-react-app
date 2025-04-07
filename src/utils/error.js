export default function createErrorNotice(title, message) {
  const id = crypto.randomUUID();

  return {
    id,
    title,
    message,
  };
}
