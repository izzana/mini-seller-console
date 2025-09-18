import { render, screen } from '@testing-library/react'
import OpportunitiesList from '../components/OpportunitiesList' 
import { type Opportunity } from '../types' 

describe('OpportunitiesList', () => {
  test('should show list of opportunities empty', () => {
    render(<OpportunitiesList opportunities={[]} />)
    expect(screen.getByTestId('opps-empty')).toBeInTheDocument()
    expect(screen.getByText(/no opportunities created./i)).toBeInTheDocument()
  })
  
  test('should render an opportunity with values', () => {
    const data: Opportunity[] = [
      {
        id: '10',
        name: 'Alice',
        stage: 'Prospecting',
        accountName: 'Innovate',
        amount: 12345,
      },
    ]
    render(<OpportunitiesList opportunities={data} />)
  
    const desktop = screen.getByTestId('opps-desktop')
    expect(desktop).toBeInTheDocument()
    expect(desktop).toHaveTextContent('Alice')
    expect(desktop).toHaveTextContent('Prospecting')
    expect(desktop).toHaveTextContent('Innovate')
  })
})
