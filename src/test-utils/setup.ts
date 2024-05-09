// This is a workaround while JSDOM is implementing support for native <dialog> elements
// See: https://github.com/jsdom/jsdom/issues/3294
import { vi, beforeAll } from 'vitest'

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = false
  })
})