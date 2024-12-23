/**
 * Checks if a user profile has all required fields completed
 */
export function isProfileComplete(profile: any | null) {
  if (!profile) return false;
  
  return !!(
    profile.full_name &&
    profile.company_name &&
    profile.website
  );
}
 