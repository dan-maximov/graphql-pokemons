import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PregnantWoman from '@material-ui/icons/PregnantWoman'
import AccessibilityNew from '@material-ui/icons/AccessibilityNew'
import styled from 'styled-components'
import GridListTile from '@material-ui/core/GridListTile'
import CircularProgress from '@material-ui/core/CircularProgress'
import Evo from './evo'

const ImgBody = styled.div`
  display: flex;
  height: 232px;
  justify-content: center;
  align-items: center;
`

const TitleBar = styled.div`
  height: 68px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  position: absolute;
  background: rgba(44, 56, 126, 0.5);
  align-items: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const TitleWrapper = styled.div`
  color: #fff;
  overflow: hidden;
  flex-grow: 1;
  margin-left: 16px;
  margin-right: 16px;
  display: block;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const Title = styled.div`
  overflow: hidden;
  font-size: 1rem;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const Subtitle = styled.div`
  text-align: center;
  overflow: hidden;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const UniquesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 10px;
`
const ParamBody = styled.div`
  display: flex;
  justify-content: center;
`

const ParamsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const EvolutionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoaderBody = styled.div`
  display: flex;
  justify-content: center;
`

const GET_POKE_INFO = poke => gql`
{
  pokemon(name: "${poke}") {
    image
    name
    classification
    types
    weaknesses
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    evolutions {
      image
      number
      name
    }
  }
}
`

class Poke extends Component {
  render() {
    return (
      <Query query={GET_POKE_INFO(this.props.match.params.pokemon)}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <LoaderBody>
                <CircularProgress
                  style={{ textAlign: 'center', marginTop: '10px' }}
                />
              </LoaderBody>
            )
          if (error) return `Error! ${error.message}`
          return (
            <Card>
              <GridListTile
                component="div"
                style={{ height: 300, width: '100%', paddingBottom: 20 }}
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
                    src={data.pokemon.image}
                    alt={`${data.pokemon.name}`}
                  />
                </ImgBody>
                <TitleBar>
                  <TitleWrapper>
                    <Title>{data.pokemon.name}</Title>
                    <Subtitle>
                      <span>{data.pokemon.classification}</span>
                    </Subtitle>
                  </TitleWrapper>
                </TitleBar>
              </GridListTile>
              <Typography
                variant="subheading"
                gutterBottom
                style={{ textAlign: 'center' }}
                color="primary"
              >
                Types
              </Typography>
              <UniquesWrapper style={{ width: 60 * data.pokemon.types.length }}>
                {data.pokemon.types.map(item => (
                  <Chip label={item} color="primary" />
                ))}
              </UniquesWrapper>
              <Typography
                variant="subheading"
                gutterBottom
                style={{ textAlign: 'center' }}
                color="secondary"
              >
                Weaknesses
              </Typography>
              <UniquesWrapper
                style={{ width: 60 * data.pokemon.weaknesses.length }}
              >
                {data.pokemon.weaknesses.map(item => (
                  <Chip label={item} color="secondary" />
                ))}
              </UniquesWrapper>
              <Typography
                variant="subheading"
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                Parametres
              </Typography>
              <ParamsWrapper>
                <ParamBody>
                  <PregnantWoman style={{ fontSize: 34, color: '#6573c3' }} />
                  <Typography
                    gutterBottom
                    noWrap
                    style={{ lineHeight: '34px' }}
                  >
                    {data.pokemon.weight.minimum} -{' '}
                    {data.pokemon.weight.maximum}
                  </Typography>
                </ParamBody>
                <ParamBody>
                  <AccessibilityNew
                    style={{ fontSize: 34, color: '#6573c3' }}
                  />
                  <Typography
                    gutterBottom
                    noWrap
                    style={{ lineHeight: '34px' }}
                  >
                    {data.pokemon.height.minimum} -{' '}
                    {data.pokemon.height.maximum}
                  </Typography>
                </ParamBody>
              </ParamsWrapper>
              <Typography
                variant="subheading"
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                Evolutions
              </Typography>
              <EvolutionsWrapper>
                {data.pokemon.evolutions != null ? (
                  data.pokemon.evolutions.map(child => <Evo child={child} />)
                ) : (
                  <Typography variant="caption" gutterBottom align="center">
                    This is the last evolution
                  </Typography>
                )}
              </EvolutionsWrapper>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.props.history.goBack()}
                >
                  Back
                </Button>
              </CardActions>
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default Poke
