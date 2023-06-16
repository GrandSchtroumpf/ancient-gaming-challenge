export async function get<T>(query: string, variables: any) {
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({query, variables}),
  });
  if (!res.ok) {
    console.error(res.status, res.statusText)
    throw res.statusText;
  }
  const { data } = await res.json();
  return data as Promise<T>;
}