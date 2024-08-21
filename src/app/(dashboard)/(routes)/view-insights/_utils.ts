export async function getDashboardData(userId: string, subjectId: number) {
  const res = await fetch(`https://noahai-dev.codeyoung.com/api/dashboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, subjectId }),
  });
  const data = await res.json();
  return data;
}

export async function getInsightsData(
  userId: string,
  subjectId: number,
  grade: number
) {
  const res = await fetch(`https://noahai-dev.codeyoung.com/api/insights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, subjectId, grade }),
  });
  const data = await res.json();
  return data;
}
