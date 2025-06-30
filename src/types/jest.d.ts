import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveClass(...classNames: string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeRequired(): R
      toHaveValue(value: string | string[] | number): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toBeChecked(): R
      toHaveFocus(): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveAccessibleName(name: string | RegExp): R
      toHaveAccessibleDescription(description: string | RegExp): R
    }
  }
} 