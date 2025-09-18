import { screen, within } from '@testing-library/react'

export function getDesktopWrap() {
  return screen.getByTestId('leads-desktop')
}

export function getDesktopTable() {
  const wrap = getDesktopWrap()
  return within(wrap).getByRole('table')
}

export function withinDesktop() {
  return within(getDesktopWrap())
}

export function withinDesktopTable() {
  return within(getDesktopTable())
}