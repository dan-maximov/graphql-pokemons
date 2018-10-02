import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import Item from './item'

const GET_POKE_LIST = gql`
  {
    pokemons(first: 151) {
      name
      image
    }
  }
`

const Search = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
  margin-right: 16px;
  margin-left: 0;
  width: 100%;
  @media (min-width: 600px) {
    width: auto;
    margin-left: 24px;
  }
`

const SearchBody = styled.div`
  color: inherit;
  width: 100%;
  position: relative;
  cursor: text;
  display: inline-flex;
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.1875em;
  align-items: center;
`

const Input = styled.input`
  font: inherit;
  color: #fff;
  width: 100%;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding-top: 8px;
  padding-left: 80px;
  padding-right: 8px;
  padding-bottom: 8px;
  font: inherit;
  border: 0;
  margin: 0;
  display: block;
  min-width: 0;
  box-sizing: content-box;
  background: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a0a9da;
  }
`

const SearchIconBody = styled.div`
  width: 72px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.3125rem;
  font-weight: 500;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.16667em;
  margin: 0;
  display: block;
  background-color: #3f51b5;
  @media (max-width: 600px) {
    display: none;
  }
`

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

class Header extends Component {
  state = {
    search: ''
  }
  getTop = index => {
    if (window.innerWidth < 600) {
      return 42 * (index + 1)
    }
    return 51 * (index + 1)
  }
  getWidth() {
    if (window.innerWidth > 600) {
      return '260px'
    }
    return 'calc(100vw - 58px)'
  }
  getButtonWidth() {
    if (window.innerWidth > 600) {
      return '270px'
    }
    return 'calc(100vw - 48px)'
  }
  render() {
    return (
      <AppBar style={{ position: 'static' }}>
        <Toolbar>
          <Title to="/" style={{ textDecoration: 'none' }} noWrap>
            Pokémons List
          </Title>
          <Search>
            <SearchIconBody>
              <SearchIcon />
            </SearchIconBody>
            <SearchBody>
              <Input
                placeholder="Search…"
                disableUnderline
                onChange={e => this.setState({ search: e.target.value })}
              />
            </SearchBody>
          </Search>
          {this.state.search.length > 0 ? (
            <Query query={GET_POKE_LIST}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <SearchLoadingWrapper>
                      <CircularProgress
                        style={{
                          width: '25px',
                          height: '25px'
                        }}
                      />
                    </SearchLoadingWrapper>
                  )
                if (error) return `Error! ${error.message}`
                const filtered = data.pokemons.filter(item =>
                  item.name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                )
                const pokemons = []
                if (filtered.length > 5) {
                  for (let i = 0; i < 5; ) {
                    pokemons.push(
                      <Item
                        filtered={filtered}
                        i={i}
                        getTop={this.getTop}
                        getWidth={this.getWidth}
                        getButtonWidth={this.getButtonWidth}
                      />
                    )
                    i++
                  }
                } else {
                  for (let i = 0; i < filtered.length; ) {
                    pokemons.push(
                      <Item
                        filtered={filtered}
                        i={i}
                        getTop={this.getTop}
                        getWidth={this.getWidth}
                        getButtonWidth={this.getButtonWidth}
                      />
                    )
                    i++
                  }
                }
                return pokemons
              }}
            </Query>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
