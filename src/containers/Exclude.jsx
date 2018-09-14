import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, ControlLabel, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions';

class Exclude extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onAddExcluded = this.onAddExcluded.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.props.actions.getUsers();
  }
  componentWillReceiveProps(next) {
    if (this.props.excluded !== next.excluded) {
      this.setState({ excluded: next.excluded });
    }
  }
  onChange(user) {
    this.setState({ userId: (user || {}).value }, () =>
      this.props.actions.getExcludeList(this.state.userId),
    );
  }
  onAddExcluded(items) {
    this.setState({ excluded: items.map(item => item.value) });
  }

  save(e) {
    e.preventDefault();
    this.props.actions.addExclude(this.state.userId, this.state.excluded);
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <FormGroup>
              <ControlLabel>Gift Reciever</ControlLabel>
              <Select
                value={this.state.userId}
                onChange={this.onChange}
                options={this.props.users.map(user => ({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                }))}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={6}>
            <FormGroup>
              <ControlLabel>Excluded Gift Givers</ControlLabel>
              <Select
                multi
                disabled={!this.state.userId}
                value={this.state.excluded}
                onChange={this.onAddExcluded}
                options={this.props.users
                  .filter(user => user.id !== this.state.userId)
                  .map(user => ({
                    label: `${user.firstName} ${user.lastName}`,
                    value: user.id,
                  }))}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <FormGroup>
              <Button onClick={this.save} bsStyle="primary">
                Save
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Exclude.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  excluded: PropTypes.array.isRequired,
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});
export default connect(
  state => ({ users: state.userReducer.users, excluded: state.userReducer.excluded }),
  mapDispatchToProps,
)(Exclude);
