import { NextRequest } from "next/server";
import { cities } from "@/mocks/cities";
import { calculateDistance } from "@/lib/utils";

// Tel Aviv coordinates for distance calculation
const TEL_AVIV_COORDS = { lat: 32.0853, lng: 34.7818 };


// GET /api/cities - Get all cities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const continent = searchParams.get('continent') || ''
    const sortBy = searchParams.get('sortBy') || ''
    
    let filteredCities = [...cities]
    filteredCities = filteredCities.filter(city => city.active === true)
    
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim()
      filteredCities = filteredCities.filter(city => 
        city.name.toLowerCase().includes(searchLower) ||
        city.country.toLowerCase().includes(searchLower)
      )
    }
    
    if (continent.trim()) {
      const continentLower = continent.toLowerCase().trim()
      filteredCities = filteredCities.filter(city => 
        city.continent.toLowerCase().includes(continentLower)
      )
    }
    
    const sortedCities = filteredCities.map(city => ({
      ...city,
      distanceFromTelAviv: calculateDistance(
        TEL_AVIV_COORDS.lat, 
        TEL_AVIV_COORDS.lng, 
        city.coords.lat, 
        city.coords.lng
      )
    }));
    
    if (sortBy === 'name') {
      sortedCities.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'distance') {
      sortedCities.sort((a, b) => a.distanceFromTelAviv - b.distanceFromTelAviv);
    }
    
    
    
    const response = {
      cities: sortedCities
    }
    
    return Response.json(response)
  } catch (error) {
    console.error('Error fetching cities:', error)
    return Response.json({ cities: [] }, { status: 500 })
  }
}
 