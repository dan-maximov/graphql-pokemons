import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GridList from '@material-ui/core/GridList';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Poke from './poke';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`;

const GET_POKE_LIST = gql`
  {
    pokemons(first: 151) {
      number
      name
      types
      image
    }
  }
`;
class List extends Component {
  state = {
    first: 30
  };
  wrapper = React.createRef;
  handleScroll = () => {
    const { first } = this.state;
    if (
      window.scrollY + window.innerHeight >
      document.body.offsetHeight - 250
    ) {
      if (first + 30 > 151) {
        this.setState({
          first: 151
        });
        return;
      }
      if (first === 151) {
        return;
      }
      this.setState(prevState => ({
        first: prevState.first + 30
      }));
    }
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }
  render() {
    const { first } = this.state;
    return (
      <GridList
        cellWidth={300}
        style={{
          height: 'auto',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Wrapper
          style={{
            height: 'calc(100% - 48px)',
            width: '100%'
          }}
        >
          <Query query={GET_POKE_LIST}>
            {({ loading, error, data }) => {
              if (loading) {
                return <CircularProgress style={{ marginTop: '10px' }} />;
              }
              if (error) {
                return `Error! ${error.message}`;
              }
              const Pokemons = data.pokemons
                .slice(0, first)
                .map(poke => <Poke poke={poke} />);
              console.log(Pokemons);
              return Pokemons;
            }}
          </Query>
        </Wrapper>
      </GridList>
    );
  }
}

export default List;
