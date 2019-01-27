import React, { Component } from 'react';
import './App.css';
import { Container,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
class Home extends Component {
  constructor(props) {
     super(props);

     this.toggleNavbar = this.toggleNavbar.bind(this);
     this.state = {
       collapsed: true
     };
   }

   toggleNavbar() {
     this.setState({
       collapsed: !this.state.collapsed
     });
   }
   render() {
     return (
       <Container>
         <Navbar color="transparent" light >
           <NavbarBrand href="/" className="mr-auto"><h1 className="text-info font-weight-normal" > Sensors Data</h1></NavbarBrand>
           <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
           <Collapse isOpen={!this.state.collapsed} navbar>
             <Nav navbar>
               <NavItem>
                 <NavLink href="/temperatura"><h4 className="text-black font-weight-normal">Temperatura</h4></NavLink>
               </NavItem>
               <NavItem>
                 <NavLink href="/metano"><h4 className="text-black font-weight-normal">Metano</h4></NavLink>
               </NavItem>
             </Nav>
           </Collapse>
         </Navbar>
       </Container>
     );
   }
}

export default Home;
