import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Item from './item';

const GET_POKE_LIST = gql`
  {
    pokemons(first: 151) {
      name
      image
    }
  }
`;

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
`;

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
`;

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
`;

const SearchIconBody = styled.div`
  width: 72px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
`;

const SearchLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  align-items: center;
  height: 52px;
  width: 270px;
  position: absolute;
  z-index: 1;
  background: #2c387e;
  &:hover {
    background: #323e85;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  position: absolute;
  z-index: 1;
  background: #2c387e;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

class Header extends Component {
  constructor() {
    super();
    this.clearSearch = this.clearSearch.bind(this);
  }
  state = {
    search: '',
  };
  clearSearch() {
    this.setState({ search: '' });
  }
  render() {
    const { search } = this.state;
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
                value={search}
              />
            </SearchBody>
            {search.length > 0 && (
              <Query query={GET_POKE_LIST}>
                {({ loading, error, data }) => {
                  if (loading)
                    return (
                      <SearchLoadingWrapper>
                        <CircularProgress
                          style={{
                            width: '25px',
                            height: '25px',
                          }}
                        />
                      </SearchLoadingWrapper>
                    );
                  if (error) return `Error! ${error.message}`;
                  const filtered = data.pokemons.filter(item =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                  );
                  const pokemons = filtered
                    .slice(0, 5)
                    .map((item, index) => (
                      <Item item={item} clearSearch={this.clearSearch} />
                    ));
                  return <ResultWrapper>{pokemons}</ResultWrapper>;
                }}
              </Query>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
