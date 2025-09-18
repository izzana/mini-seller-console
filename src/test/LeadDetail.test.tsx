import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LeadDetail from '../components/LeadDetail'
import { vi } from 'vitest'
import { type Lead } from '../types' 

const lead: Lead = {
  id: '1',
  name: 'Alice',
  company: 'Innovate',
  email: 'alice@innovate.com',
  source: 'Web',
  score: 90,
  status: 'New',
}
describe('LeadDetail', () => {
  test('should edit email, validate and save', async () => {
    const onSave = vi.fn()
    render(
      <LeadDetail lead={lead} onClose={() => {}} onSave={onSave} onConvert={() => {}} />,
    )
  
    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    const emailInput = screen.getByDisplayValue('alice@innovate.com')
  
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'invalido')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
  
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'alice@new.com')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
  
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', email: 'alice@new.com' }),
    )
  })
  
  test('cancel should restore values and convert calls onConvert', async () => {
    const onConvert = vi.fn()
    render(
      <LeadDetail lead={lead} onClose={() => {}} onSave={() => {}} onConvert={onConvert} />,
    )
  
    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    const emailInput = screen.getByDisplayValue('alice@innovate.com')
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'tmp@tmp.com')
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }))
  
    expect(screen.getByText('alice@innovate.com')).toBeInTheDocument()
  
    await userEvent.click(screen.getByRole('button', { name: /convert lead/i }))
    expect(onConvert).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }))
  })
  
  test('closing panel triggers onClose', async () => {
    const onClose = vi.fn()
    render(
      <LeadDetail lead={lead} onClose={onClose} onSave={() => {}} onConvert={() => {}} />,
    )
  
    await userEvent.click(screen.getByRole('button', { name: /✕/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
