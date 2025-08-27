export function decode(
  encoded: string
): { latitude: number; longitude: number }[] {
  let index = 0;
  const len = encoded.length;
  const path: { latitude: number; longitude: number }[] = [];
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    path.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return path;
}
