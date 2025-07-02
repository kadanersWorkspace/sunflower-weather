import { calculateDistance, cn } from '../utils'

describe('Utils Functions', () => {
  describe('calculateDistance', () => {
    it('calculates distance between Tel Aviv and Barcelona correctly', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      const barcelona = { lat: 41.390205, lng: 2.154007 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, barcelona.lat, barcelona.lng)
      
      // Barcelona is approximately 3000+ km from Tel Aviv
      expect(distance).toBeGreaterThan(3000)
      expect(distance).toBeLessThan(3200)
    })

    it('calculates distance between Tel Aviv and Tokyo correctly', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      const tokyo = { lat: 35.689487, lng: 139.691711 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, tokyo.lat, tokyo.lng)
      
      // Tokyo is approximately 9000+ km from Tel Aviv
      expect(distance).toBeGreaterThan(9000)
      expect(distance).toBeLessThan(9300)
    })

    it('calculates distance between Tel Aviv and Cairo correctly', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      const cairo = { lat: 30.044419, lng: 31.235712 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, cairo.lat, cairo.lng)
      
      // Cairo is approximately 400 km from Tel Aviv
      expect(distance).toBeGreaterThan(300)
      expect(distance).toBeLessThan(500)
    })

    it('returns 0 for identical coordinates', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, telAviv.lat, telAviv.lng)
      
      expect(distance).toBe(0)
    })

    it('calculates distance for coordinates on opposite sides of the globe', () => {
      const point1 = { lat: 0, lng: 0 } // Equator, Prime Meridian
      const point2 = { lat: 0, lng: 180 } // Equator, opposite side
      
      const distance = calculateDistance(point1.lat, point1.lng, point2.lat, point2.lng)
      
      // Half the Earth's circumference is approximately 20,000 km
      expect(distance).toBeGreaterThan(19000)
      expect(distance).toBeLessThan(21000)
    })

    it('handles negative coordinates correctly', () => {
      const sydney = { lat: -33.868820, lng: 151.209290 }
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, sydney.lat, sydney.lng)
      
      // Sydney is very far from Tel Aviv (14000+ km)
      expect(distance).toBeGreaterThan(14000)
      expect(distance).toBeLessThan(15000)
    })

    it('returns a whole number (rounded)', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      const barcelona = { lat: 41.390205, lng: 2.154007 }
      
      const distance = calculateDistance(telAviv.lat, telAviv.lng, barcelona.lat, barcelona.lng)
      
      expect(distance).toBe(Math.round(distance))
      expect(Number.isInteger(distance)).toBe(true)
    })

    it('handles very small distances correctly', () => {
      const point1 = { lat: 32.0853, lng: 34.7818 }
      const point2 = { lat: 32.0854, lng: 34.7819 } // Very close points
      
      const distance = calculateDistance(point1.lat, point1.lng, point2.lat, point2.lng)
      
      expect(distance).toBeGreaterThanOrEqual(0)
      expect(distance).toBeLessThan(1) // Should be less than 1 km
    })

    it('produces symmetrical results (distance A to B equals distance B to A)', () => {
      const telAviv = { lat: 32.0853, lng: 34.7818 }
      const barcelona = { lat: 41.390205, lng: 2.154007 }
      
      const distance1 = calculateDistance(telAviv.lat, telAviv.lng, barcelona.lat, barcelona.lng)
      const distance2 = calculateDistance(barcelona.lat, barcelona.lng, telAviv.lat, telAviv.lng)
      
      expect(distance1).toBe(distance2)
    })
  })

  describe('cn function (className utility)', () => {
    it('merges class names correctly', () => {
      const result = cn('bg-red-500', 'text-white', 'p-4')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).toContain('p-4')
    })

    it('handles undefined and null values', () => {
      const result = cn('bg-red-500', undefined, null, 'text-white')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).not.toContain('undefined')
      expect(result).not.toContain('null')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class', 'other-class')
      
      expect(result).toContain('base-class')
      expect(result).toContain('active-class')
      expect(result).toContain('other-class')
    })

    it('handles false conditional classes', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class', 'other-class')
      
      expect(result).toContain('base-class')
      expect(result).not.toContain('active-class')
      expect(result).toContain('other-class')
    })

    it('handles arrays of classes', () => {
      const result = cn(['bg-red-500', 'text-white'], 'p-4')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).toContain('p-4')
    })

    it('handles objects with boolean values', () => {
      const result = cn({
        'bg-red-500': true,
        'text-white': false,
        'p-4': true
      })
      
      expect(result).toContain('bg-red-500')
      expect(result).not.toContain('text-white')
      expect(result).toContain('p-4')
    })

    it('returns empty string for no arguments', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('handles Tailwind class conflicts (should merge properly)', () => {
      // This tests the twMerge functionality
      const result = cn('p-4', 'p-6') // Conflicting padding classes
      
      // twMerge should keep only the last one
      expect(result).toContain('p-6')
      expect(result).not.toContain('p-4')
    })
  })
}) 