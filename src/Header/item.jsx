import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'

const SearchLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  width: 270px;
  position: absolute;
  z-index: 1;
  top: 51px;
  left: 188px;
  background: #2c387e;
  @media (max-width: 600px) {
    width: calc(100% - 48px);
    top: 42px;
    height: 43px;
    left: 16px;
  }
`

const SearchChildBody = styled.div`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  &:hover {
    background: rgba(44, 56, 126, 0.1);
  }
`

const classes = {
  title: {
    color: '#fff'
  }
}

class Item extends Component {
  render() {
    const { classes } = this.props
    return (
      <SearchLoadingWrapper style={{ top: this.props.getTop(this.props.i) }}>
        <ButtonBase
          style={{
            width: this.props.getButtonWidth(),
            textAlign: 'start'
          }}
          component={Link}
          to={`/${this.props.filtered[this.props.i].name}`}
          onClick={() => this.setState({ search: '' })}
        >
          <SearchChildBody>
            <CardHeader
              avatar={
                <Avatar
                  alt={this.props.filtered[this.props.i].name}
                  src={this.props.filtered[this.props.i].image}
                />
              }
              classes={{
                title: classes.title
              }}
              title={this.props.filtered[this.props.i].name}
              style={{
                width: this.props.getWidth(),
                padding: '2px 5px',
                color: '#fff'
              }}
            />
          </SearchChildBody>
        </ButtonBase>
      </SearchLoadingWrapper>
    )
  }
}

export default withStyles(classes)(Item)
