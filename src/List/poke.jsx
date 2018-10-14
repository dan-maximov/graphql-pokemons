import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import styled from 'styled-components';

const ImgBody = styled.div`
  display: flex;
  height: 232px;
  justify-content: center;
  align-items: center;
`;

class Poke extends Component {
  render() {
    const { poke } = this.props;
    return (
      <GridListTile
        style={{ height: 300, width: 300, paddingBottom: 20 }}
        key={poke.name}
      >
        <ImgBody>
          <img
            style={{
              width: 'auto',
              margin: '0 auto',
              height: '200px',
              left: '50%',
              position: 'static',
              transform: 'translateY(0%)'
            }}
            src={poke.image}
            alt={`${poke.name}`}
          />
        </ImgBody>
        <GridListTileBar
          style={{ background: 'rgba(44, 56, 126, 0.5)' }}
          title={`${parseInt(poke.number, 10)} - ${poke.name}`}
          subtitle={<span>{poke.types.toString()}</span>}
          actionIcon={
            <IconButton component={Link} to={`/${poke.name}`}>
              <InfoIcon style={{ color: 'rgba(255, 255, 255, 0.54)' }} />
            </IconButton>
          }
        />
      </GridListTile>
    );
  }
}

export default Poke;
