function trimToHalf(inputString: string) {
  if (typeof inputString !== "string") {
    throw new Error("Input must be a string");
  }

  return inputString.slice(0, 10);
}

export function trimUuidToHalf(uuid: string) {
  if (typeof uuid !== "string" || uuid.length !== 36) {
    throw new Error("Input must be a valid UUID string");
  }

  return trimToHalf(uuid);
}
