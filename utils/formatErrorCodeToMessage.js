export default function formatErrorCodeToMessage(errorCode) {
  let errorMessage = errorCode.replaceAll('-', ' ');
  return errorMessage.slice(5);
}
