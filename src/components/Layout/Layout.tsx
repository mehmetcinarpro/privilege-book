import Container from '@material-ui/core/Container';
import React from 'react'
 
const Layout: React.FC = ({children}) => {
  return (
    <Container>
        <>
        {children}
        </>
    </Container>
  )
}
 
export default Layout;