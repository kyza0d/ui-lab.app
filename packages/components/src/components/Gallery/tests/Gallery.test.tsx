import { render, screen } from "@testing-library/react"
import { Gallery } from "../Gallery"
import { describe, it, expect } from "vitest"
import React from "react"

describe("Gallery", () => {
  it("renders with default vertical orientation", () => {
    render(
      <Gallery>
        <Gallery.Item>
          <Gallery.View>View</Gallery.View>
          <Gallery.Body>Body</Gallery.Body>
        </Gallery.Item>
      </Gallery>
    )

    const item = screen.getByRole("button") // GalleryItem has role="button"
    expect(item).toHaveAttribute("data-orientation", "vertical")
  })

  it("renders with horizontal orientation when specified", () => {
    render(
      <Gallery>
        <Gallery.Item orientation="horizontal">
          <Gallery.View>View</Gallery.View>
          <Gallery.Body>Body</Gallery.Body>
        </Gallery.Item>
      </Gallery>
    )

    const item = screen.getByRole("button")
    expect(item).toHaveAttribute("data-orientation", "horizontal")
  })
})
