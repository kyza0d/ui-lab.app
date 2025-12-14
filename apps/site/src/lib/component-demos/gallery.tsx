"use client"

import { Gallery } from "ui-lab-components"
import { ComponentDetail } from "@/types/component"
import { ControlDef } from "@/components/component-configurator"

const galleryControls: ControlDef[] = [
  {
    name: "columns",
    label: "Columns",
    type: "select",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
    defaultValue: "3",
  },
  {
    name: "gap",
    label: "Gap",
    type: "select",
    options: [
      { label: "None", value: "0" },
      { label: "Small", value: "2" },
      { label: "Medium", value: "4" },
      { label: "Large", value: "6" },
    ],
    defaultValue: "4",
  },
]

const basicItems = [
  { id: 1, title: "Mountain Landscape", description: "Beautiful mountain scenery at sunset", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop", href: "#mountain" },
  { id: 2, title: "Ocean Waves", description: "Powerful waves crashing on the shore", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=450&fit=crop", href: "#ocean" },
  { id: 3, title: "Forest Path", description: "A peaceful trail through the woods", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop", href: "#forest" },
  { id: 4, title: "City Skyline", description: "Urban architecture at twilight", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=450&fit=crop", href: "#city" },
  { id: 5, title: "Desert Dunes", description: "Golden sand dunes in the Sahara", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop", href: "#desert" },
  { id: 6, title: "Northern Lights", description: "Aurora borealis dancing in the sky", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=450&fit=crop", href: "#aurora" },
]

const products = [
  { id: 1, name: "Wireless Headphones", price: 149.99, originalPrice: 199.99, rating: 4.5, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", href: "#product-1" },
  { id: 2, name: "Smart Watch Pro", price: 299.99, rating: 4.8, reviews: 1234, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop", href: "#product-2" },
  { id: 3, name: "Portable Speaker", price: 79.99, originalPrice: 99.99, rating: 4.2, reviews: 567, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop", href: "#product-3" },
  { id: 4, name: "Minimalist Backpack", price: 89.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop", href: "#product-4" },
]

const videos = [
  { id: 1, title: "Learn React in 30 Minutes", channel: "Code Academy", views: "1.2M views", uploaded: "2 weeks ago", duration: "32:15", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop", href: "#video-1" },
  { id: 2, title: "Building Modern UIs", channel: "Design Systems", views: "856K views", uploaded: "1 month ago", duration: "45:30", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop", href: "#video-2" },
  { id: 3, title: "TypeScript Tips", channel: "Dev Mastery", views: "432K views", uploaded: "3 days ago", duration: "18:42", thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop", href: "#video-3" },
]

const galleryBasicCode = `import { Gallery } from "ui-lab-components"

const items = [
  { id: 1, title: "Mountain", image: "...", href: "#" },
  { id: 2, title: "Ocean", image: "...", href: "#" },
  { id: 3, title: "Forest", image: "...", href: "#" },
]

export function Example() {
  return (
    <Gallery columns={3}>
      {items.map((item) => (
        <Gallery.Item key={item.id} href={item.href}>
          <Gallery.View aspectRatio="16/9">
            <img src={item.image} alt={item.title} />
          </Gallery.View>
          <Gallery.Body>
            <strong>{item.title}</strong>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  )
}`

const galleryProductCode = `import { Gallery } from "ui-lab-components"

const products = [
  { id: 1, name: "Product", price: 99.99, image: "..." },
]

export function Example() {
  return (
    <Gallery columns={{ base: 2, md: 3, lg: 4 }}>
      {products.map((product) => (
        <Gallery.Item key={product.id} href="#">
          <Gallery.View aspectRatio="1/1">
            <img src={product.image} alt={product.name} />
          </Gallery.View>
          <Gallery.Body>
            <strong>{product.name}</strong>
            <span>\${product.price}</span>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  )
}`

const galleryVideoCode = `import { Gallery } from "ui-lab-components"

const videos = [
  { id: 1, title: "Video", duration: "10:00", thumbnail: "..." },
]

export function Example() {
  return (
    <Gallery columns={{ base: 1, sm: 2, lg: 3 }}>
      {videos.map((video) => (
        <Gallery.Item key={video.id} href="#">
          <Gallery.View aspectRatio="16/9">
            <img src={video.thumbnail} alt={video.title} />
            <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs">
              {video.duration}
            </span>
          </Gallery.View>
          <Gallery.Body>
            <strong>{video.title}</strong>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  )
}`

const galleryResponsiveCode = `import { Gallery } from "ui-lab-components"

export function Example() {
  return (
    <Gallery columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {/* Items automatically reflow based on container width */}
    </Gallery>
  )
}`

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= Math.floor(rating) ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  )
}

export const galleryDetail: ComponentDetail = {
  id: "gallery",
  name: "Gallery",
  description: "A responsive grid layout component for displaying media content like images, videos, and product cards.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Gallery component provides a flexible grid layout for displaying collections of media content. It supports responsive columns, customizable aspect ratios, and built-in hover/focus interactions.
      </p>
      <p>
        Gallery uses a compound component pattern with Gallery.Item, Gallery.View, and Gallery.Body subcomponents for flexible content composition.
      </p>
    </div>
  ),
  examples: [
    {
      id: "basic",
      title: "Basic Gallery",
      description: "A simple image gallery with titles and descriptions.",
      code: galleryBasicCode,
      preview: (
        <Gallery columns={3}>
          {basicItems.slice(0, 3).map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
      controls: galleryControls,
      renderPreview: (props: any) => (
        <Gallery columns={parseInt(props.columns)} gap={parseInt(props.gap)}>
          {basicItems.slice(0, 3).map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
    {
      id: "product",
      title: "Product Grid",
      description: "A product catalog layout with prices and ratings.",
      code: galleryProductCode,
      preview: (
        <Gallery columns={{ base: 2, md: 4 }}>
          {products.map((product) => (
            <Gallery.Item key={product.id} href={product.href}>
              <Gallery.View aspectRatio="1/1">
                <img src={product.image} alt={product.name} />
                {product.originalPrice && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </Gallery.View>
              <Gallery.Body>
                <strong className="truncate">{product.name}</strong>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground-50">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="line-through text-xs text-foreground-500">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <StarRating rating={product.rating} />
                  <span className="text-foreground-400">({product.reviews.toLocaleString()})</span>
                </div>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
    {
      id: "video",
      title: "Video Thumbnails",
      description: "A video grid with duration overlays.",
      code: galleryVideoCode,
      preview: (
        <Gallery columns={{ base: 1, sm: 3 }}>
          {videos.map((video) => (
            <Gallery.Item key={video.id} href={video.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={video.thumbnail} alt={video.title} />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                  {video.duration}
                </span>
              </Gallery.View>
              <Gallery.Body>
                <strong className="line-clamp-2">{video.title}</strong>
                <p>{video.channel}</p>
                <p className="text-xs">{video.views} • {video.uploaded}</p>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
    {
      id: "responsive",
      title: "Responsive Columns",
      description: "Gallery with responsive column configuration.",
      code: galleryResponsiveCode,
      preview: (
        <Gallery columns={{ base: 1, sm: 2, md: 3 }}>
          {basicItems.slice(0, 6).map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard gallery grid with equal-sized items.",
      code: galleryBasicCode,
      preview: (
        <Gallery columns={3}>
          {basicItems.slice(0, 3).map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
  ],
}
