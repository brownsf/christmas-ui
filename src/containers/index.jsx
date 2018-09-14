import React from 'react';
import { Grid, Jumbotron, NavItem, Nav, Navbar } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home';
import Exclude from './Exclude';
import Add from './Add';

const Main = () => (
  <Grid>
    <Jumbotron>
      <h1 style={{ textAlign: 'center' }}>Secret Santa Drawing!</h1>
      <p style={{ textAlign: 'center' }}>Welcome to the Christmas draw. Find your name in the drop down the hit the button.</p>
      <p style={{ textAlign: 'center' }}>
        <img style={{ maxWidth: '100%' }} src="https://media.giphy.com/media/12ac3nREOk0iWI/giphy.gif" alt="christmas" />
      </p>
    </Jumbotron>
    <Navbar>
      <Nav>
        <LinkContainer to="/home">
          <NavItem eventKey={1}>Choose</NavItem>
        </LinkContainer>
        <LinkContainer to="/exclude">
          <NavItem eventKey={2}>Exclude</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <main>
      <Route exact path="/exclude" component={Exclude} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </main>
  </Grid>
);

Main.propTypes = {};
export default Main;
