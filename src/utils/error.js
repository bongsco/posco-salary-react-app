export default function createErrorNotice(
  title,
  message,
  id = crypto.randomUUID(),
) {
  return {
    id,
    title,
    message,
  };
}
