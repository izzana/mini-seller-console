import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LeadsTable from '../components/LeadsTable'
import { leadsFixture } from './fixtures/leads'
import { vi } from 'vitest'
import { withinDesktopTable } from './utils/dom'

describe('LeadsTable', () => {
  beforeEach(() => localStorage.clear())
  
  test('should render lines and allow lead selection (desktop)', async () => {
    const onSelectLead = vi.fn()
    render(<LeadsTable leads={leadsFixture} onSelectLead={onSelectLead} />)
  
    const table = withinDesktopTable()
  
    for (const lead of leadsFixture) {
      expect(table.getByText(lead.name)).toBeInTheDocument()
      expect(table.getByText(lead.company)).toBeInTheDocument()
    }
  
    const aliceCell = table.getByText('Alice')
    await userEvent.click(aliceCell.closest('tr')!)
    expect(onSelectLead).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', name: 'Alice' }),
    )
  })
  
  test('should search by name/company and filter by status (desktop)', async () => {
    render(<LeadsTable leads={leadsFixture} onSelectLead={() => {}} />)

    const search = screen.getByPlaceholderText(/search (for )?name(\/| or )company/i)

    await userEvent.type(search, 'green')
    const table = withinDesktopTable()
    expect(table.getByRole('cell', { name: 'Carol' })).toBeInTheDocument()
    expect(table.queryByText('Alice')).not.toBeInTheDocument()

    await userEvent.clear(search)

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Qualified')
    expect(table.getByRole('cell', { name: 'Bob' })).toBeInTheDocument()
    expect(table.queryByText('Carol')).not.toBeInTheDocument()
  })
  
  test('should sort by score and persists in localStorage', async () => {
    render(<LeadsTable leads={leadsFixture} onSelectLead={() => {}} />)
  
    const sortBtn = screen.getByRole('button', { name: /sort score/i })
    await userEvent.click(sortBtn)
    expect(JSON.parse(localStorage.getItem('lead-sort-desc')!)).toBe(false)
  
    const search = screen.getByPlaceholderText(/search/i)
    await userEvent.type(search, 'inn')
    expect(JSON.parse(localStorage.getItem('lead-search')!)).toBe('inn')
  
    await userEvent.selectOptions(screen.getByRole('combobox'), 'New')
    expect(JSON.parse(localStorage.getItem('lead-status')!)).toBe('New')
  })
})
