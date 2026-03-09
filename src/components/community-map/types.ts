/**
 * User type for community map display
 */
export type MapUserType = "FREELANCER" | "CLIENT";

/**
 * User data returned from the map locations API
 */
export interface MapUser {
  id: string;
  name: string;
  avatar: string | null;
  userType: MapUserType;
  country: string;
  countryCode: string;
  region: string | null;
  latitude: number;
  longitude: number;
}

/**
 * Response from GET /users/map-locations
 */
export interface MapLocationsResponse {
  users: MapUser[];
  total: number;
}

/**
 * Computed stats for the map
 */
export interface MapStats {
  totalMembers: number;
  totalCountries: number;
  freelancersCount: number;
  clientsCount: number;
}
