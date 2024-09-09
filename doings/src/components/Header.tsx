type Props = {
  text: string
}

export const Header = ({ text }: Props) => (
  <header>
    <h1 data-testid="app-title">{text}</h1>
  </header>
)
