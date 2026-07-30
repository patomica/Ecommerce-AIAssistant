import * as Location from 'expo-location';

export interface ResolvedLocation {
  latitude: number;
  longitude: number;
  label: string;
}

export async function resolveCurrentLocation(): Promise<ResolvedLocation> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission was denied.');
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  let label = 'Your area';
  try {
    const places = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const place = places[0];
    if (place) {
      label = [place.city ?? place.subregion, place.region].filter(Boolean).join(', ') || label;
    }
  } catch {
    // Reverse geocoding is best-effort; fall back to the generic label.
  }

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    label,
  };
}
