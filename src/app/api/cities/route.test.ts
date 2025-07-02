/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';

// Mock the cities data
jest.mock('@/mocks/cities', () => ({
  cities: [
    {
      name: "Barcelona",
      continent: "Europe",
      active: true,
      country: "Spain",
      description: "Barcelona is a city on the coast of northeastern Spain.",
      image: "https://picsum.photos/id/402/500/500",
      coords: {
        lat: 41.390205,
        lng: 2.154007
      }
    },
    {
      name: "Tokyo",
      continent: "Asia",
      active: true,
      country: "Japan",
      description: "Tokyo is the capital and largest city of Japan.",
      image: "https://picsum.photos/id/401/500/500",
      coords: {
        lat: 35.689487,
        lng: 139.691711
      }
    },
    {
      name: "Cairo",
      continent: "Africa",
      active: true,
      country: "Egypt",
      description: "Cairo is close to Tel Aviv.",
      image: "https://picsum.photos/id/400/500/500",
      coords: {
        lat: 30.044419,
        lng: 31.235712
      }
    },
    {
      name: "Inactive City",
      continent: "Europe",
      active: false,
      country: "Test Country",
      description: "This city should not be returned.",
      image: "https://picsum.photos/id/399/500/500",
      coords: {
        lat: 0,
        lng: 0
      }
    }
  ]
}))

describe("Cities API", () => {
  jest.setTimeout(2500);

  it("returns cities data with distance from Tel Aviv", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("cities");
    expect(Array.isArray(data.cities)).toBe(true);
    
    // Check that each city has a distance property
    data.cities.forEach((city: any) => {
      expect(city).toHaveProperty("distanceFromTelAviv");
      expect(typeof city.distanceFromTelAviv).toBe("number");
      expect(city.distanceFromTelAviv).toBeGreaterThanOrEqual(0);
    });
  });

  it("filters out inactive cities", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3); // Should exclude inactive city
    expect(data.cities.every((city: any) => city.active === true)).toBe(true);
  });

  // Search parameter tests
  it("filters cities by name search", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=Barcelona');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].name).toBe("Barcelona");
    expect(data.cities[0]).toHaveProperty("distanceFromTelAviv");
  });

  it("filters cities by country search", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=Japan');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].country).toBe("Japan");
  });

  it("filters cities with case-insensitive search", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=BARCELONA');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].name).toBe("Barcelona");
  });

  it("filters cities with partial name search", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=Barce');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].name).toBe("Barcelona");
  });

  it("returns empty array when no cities match search", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=NonExistentCity');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(0);
  });

  it("ignores empty search parameter", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3); // Should return all active cities
  });

  it("trims search parameter", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=  Barcelona  ');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].name).toBe("Barcelona");
  });

  // Continent parameter tests
  it("filters cities by continent", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?continent=Europe');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].continent).toBe("Europe");
    expect(data.cities[0].name).toBe("Barcelona");
  });

  it("filters cities by continent case-insensitive", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?continent=ASIA');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].continent).toBe("Asia");
    expect(data.cities[0].name).toBe("Tokyo");
  });

  it("filters cities by partial continent match", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?continent=Eur');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].continent).toBe("Europe");
  });

  it("returns empty array when no cities match continent", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?continent=NonExistentContinent');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(0);
  });

  // Sorting tests
  it("sorts cities by name alphabetically", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?sortBy=name');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3);
    
    // Check alphabetical order
    expect(data.cities[0].name).toBe("Barcelona");
    expect(data.cities[1].name).toBe("Cairo");
    expect(data.cities[2].name).toBe("Tokyo");
  });

  it("sorts cities by distance from Tel Aviv", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?sortBy=distance');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3);
    
    // Check distance ordering (Cairo should be closest to Tel Aviv)
    const distances = data.cities.map((city: any) => city.distanceFromTelAviv);
    expect(distances[0]).toBeLessThanOrEqual(distances[1]);
    expect(distances[1]).toBeLessThanOrEqual(distances[2]);
    
    // Cairo should be the closest to Tel Aviv
    expect(data.cities[0].name).toBe("Cairo");
  });

  it("returns unsorted cities when no sortBy parameter", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3);
    // Should maintain original order from the mock data
    expect(data.cities[0].name).toBe("Barcelona");
    expect(data.cities[1].name).toBe("Tokyo");
    expect(data.cities[2].name).toBe("Cairo");
  });

  it("ignores invalid sortBy parameter", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?sortBy=invalid');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(3);
    // Should maintain original order when sortBy is invalid
    expect(data.cities[0].name).toBe("Barcelona");
    expect(data.cities[1].name).toBe("Tokyo");
    expect(data.cities[2].name).toBe("Cairo");
  });

  // Combined search, continent, and sorting tests
  it("filters cities by both search and continent, then sorts by name", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=Barcelona&continent=Europe&sortBy=name');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(1);
    expect(data.cities[0].name).toBe("Barcelona");
    expect(data.cities[0].continent).toBe("Europe");
  });

  it("returns empty array when search and continent filters don't match", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities?search=Barcelona&continent=Asia');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cities).toHaveLength(0);
  });

  it("calculates reasonable distances from Tel Aviv", async () => {
    const request = new NextRequest('http://localhost:3000/api/cities');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    
    // Find specific cities and check their approximate distances
    const cairo = data.cities.find((city: any) => city.name === "Cairo");
    const tokyo = data.cities.find((city: any) => city.name === "Tokyo");
    const barcelona = data.cities.find((city: any) => city.name === "Barcelona");

    // Cairo should be closest (approximately 400-500 km)
    expect(cairo.distanceFromTelAviv).toBeLessThan(1000);
    
    // Barcelona should be further (approximately 3000+ km)
    expect(barcelona.distanceFromTelAviv).toBeGreaterThan(2000);
    
    // Tokyo should be furthest (approximately 8000+ km)
    expect(tokyo.distanceFromTelAviv).toBeGreaterThan(7000);
  });
}) 