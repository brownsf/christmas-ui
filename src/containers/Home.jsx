import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import Select from 'react-select';
import * as userActions from '../redux/actions/userActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.choose = this.choose.bind(this);
  }

  componentDidMount() {
    this.props.actions.getUsers();
  }
  onChange(user) {
    this.setState({ userId: (user || {}).value }, () =>
      this.props.actions.getExcludeList(this.state.userId),
    );
  }
  choose(e) {
    e.preventDefault();
    this.props.actions.getChoice(this.state.userId);
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <FormGroup>
              <ControlLabel>Who are you?</ControlLabel>
              <Select
                value={this.state.userId}
                onChange={this.onChange}
                options={this.props.users.filter(user => !user.chosenId).map(user => ({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                }))}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={6}>
            <FormGroup>
              <ControlLabel style={{ display: 'block' }}>&nbsp;</ControlLabel>

              <Button
                disabled={!this.state.userId}
                className="pull-right"
                onClick={this.choose}
                bsStyle="primary"
              >
                See your choice
              </Button>
            </FormGroup>
            {this.props.chosen && (
              <div>
                <p>
                  <img
                    alt="christmas"
                    style={{ maxWidth: '100%' }}
                    src="http://bestanimations.com/Holidays/Christmas/merrychristmas/merry-christmas-minions-greeting-gif-4.gif"
                  />
                </p>
                <p>{"You're going to be the secret santa for:"}</p>
                <h3>
                  {this.props.users
                    .filter(user => user.id === this.props.chosen.id)
                    .map(user => `${user.firstName} ${user.lastName}`)}
                </h3>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  chosen: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});
export default connect(
  state => ({
    users: state.userReducer.users,
    choosing: state.userReducer.choosing,
    chosen: state.userReducer.chosen,
  }),
  mapDispatchToProps,
)(Home);
