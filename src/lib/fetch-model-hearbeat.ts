export default async function fetchModelHeartbeat() {
    const url = new URL("/api/heartbeat", window.location.origin);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}
