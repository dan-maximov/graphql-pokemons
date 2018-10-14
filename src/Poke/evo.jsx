import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from 'styled-components';

const EvolutionChildBody = styled.div`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  &:hover {
    background: rgba(44, 56, 126, 0.1);
  }
`;

class Evo extends Component {
  render() {
    const { child } = this.props;
    return (
      <ButtonBase
        style={{ width: 210, textAlign: 'start' }}
        component={Link}
        to={`/${child.name}`}
      >
        <EvolutionChildBody>
          <CardHeader
            avatar={<Avatar alt={child.name} src={child.image} />}
            title={`${parseInt(child.number, 10)} - ${child.name}`}
            style={{ width: 200, padding: '2px 5px' }}
          />
        </EvolutionChildBody>
      </ButtonBase>
    );
  }
}

export default Evo;
