export function setReply(doc: any) {
  return {
    sucess: true,
    status: !doc ? 404 : 200,
    body: doc || { error: "Requested Resource Not Available" },
  };
}

export function interpolateString(str = "", obj = {}) {
  const regex = /\{\{[a-zA-Z_$][a-zA-Z_$0-9]*\}\}/gm;
  return str.replace(regex, (match) => {
    const key = match.slice(2, match.length - 2);
    return obj[key] || "";
  });
}
