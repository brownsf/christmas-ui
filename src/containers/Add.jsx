import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
  }
  componentWillReceiveProps(next) {
    if (this.props.loading && !next.loading) {
      this.firstName.value = '';
      this.lastName.value = '';
    }
  }

  addUser(e) {
    e.preventDefault();
    this.props.actions.addUser(this.firstName.value, this.lastName.value);
  }
  render() {
    return (
      <Row>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={10}>
              <FormControl
                inputRef={(ref) => {
                  this.firstName = ref;
                }}
                type="text"
                placeholder="First Name"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl
                inputRef={(ref) => {
                  this.lastName = ref;
                }}
                type="text"
                placeholder="Last Name"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.addUser} type="submit">
                Add User
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Row>
    );
  }
}

Add.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});
export default connect(state => ({ loading: state.userReducer.loading }), mapDispatchToProps)(Add);
