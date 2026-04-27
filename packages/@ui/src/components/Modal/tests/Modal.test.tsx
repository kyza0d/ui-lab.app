import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Modal } from '../Modal'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/Textarea'

describe('Modal focus management', () => {
  it('does not steal focus from Input when user types', async () => {
    render(
      <Modal isOpen title="Test">
        <Input aria-label="Name" />
      </Modal>
    )

    const input = screen.getByRole('textbox', { name: 'Name' })
    await act(async () => { input.focus() })
    expect(document.activeElement).toBe(input)

    fireEvent.keyDown(input, { key: 'a' })
    fireEvent.keyUp(input, { key: 'a' })

    expect(document.activeElement).toBe(input)
  })

  it('does not steal focus from Textarea when user types', async () => {
    render(
      <Modal isOpen title="Test">
        <TextArea aria-label="Notes" />
      </Modal>
    )

    const textarea = screen.getByRole('textbox', { name: 'Notes' })
    await act(async () => { textarea.focus() })
    expect(document.activeElement).toBe(textarea)

    fireEvent.keyDown(textarea, { key: 'a' })
    fireEvent.keyUp(textarea, { key: 'a' })

    expect(document.activeElement).toBe(textarea)
  })

  it('renders compound footer outside the body content region', () => {
    render(
      <Modal isOpen close={false}>
        <Modal.Body>
          <div>Body content</div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button">Save</button>
        </Modal.Footer>
      </Modal>
    )

    const bodyContent = screen.getByText('Body content').closest('.content')
    const footer = screen.getByText('Save').closest('.footer')

    expect(bodyContent).not.toBeNull()
    expect(footer).not.toBeNull()
    expect(bodyContent?.contains(footer as Node)).toBe(false)
    expect(bodyContent?.nextElementSibling).toBe(footer)
  })
})
