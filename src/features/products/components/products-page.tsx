import { ProductsHeroSection } from "./products-hero-section"
import { DigitalGiftsSection } from "./digital-gifts-section"

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProductsHeroSection />
      <DigitalGiftsSection />
    </div>
  )
}
