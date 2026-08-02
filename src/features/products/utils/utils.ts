import type { Product } from "../types/type"

export const figmaImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const products: Product[] = Array.from({ length: 8 }, (_, i) => ({
  name: "Water Bottle",
  subtitle: "for smth ig",
  price: "$5.99",
  rating: 3.5,
  imageSrc: figmaImages[i % figmaImages.length],
}))
