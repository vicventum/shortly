import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Toaster } from 'sileo'

function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
      <Toaster />
    </MemoryRouter>
  )
}

export * from '@testing-library/react'
export { renderWithProviders }
