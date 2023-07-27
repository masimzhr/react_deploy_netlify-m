const Header = ({title}) => {
  return (
    <header>{title}</header>
  )
}
Header.defaultProps={
  title: "Deafault title"

}
export default Header