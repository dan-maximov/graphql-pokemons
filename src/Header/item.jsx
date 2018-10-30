import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const SearchChildBody = styled.div`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  &:hover {
    background: rgba(101, 115, 195, 0.1);
  }
`;

const CustomCardHeader = styled(CardHeader)`
  width: 260px;
  @media (max-width: 600px) {
    width: calc(100vw - 58px);
  }
`;

const CustomButtonBase = styled(ButtonBase)`
  width: 270px;
  @media (max-width: 600px) {
    width: calc(100vw - 48px);
  }
`;

const classes = {
  title: {
    color: '#fff',
  },
};

class Item extends Component {
  render() {
    const { classes, clearSearch, item } = this.props;
    return (
      <CustomButtonBase
        style={{
          textAlign: 'start',
        }}
        component={Link}
        to={`/${item.name}`}
        onClick={() => clearSearch()}
      >
        <SearchChildBody>
          <CustomCardHeader
            avatar={<Avatar alt={item.name} src={item.image} />}
            classes={{
              title: classes.title,
            }}
            title={item.name}
            style={{
              padding: '2px 5px',
              color: '#fff',
            }}
          />
        </SearchChildBody>
      </CustomButtonBase>
    );
  }
}

export default withStyles(classes)(Item);
