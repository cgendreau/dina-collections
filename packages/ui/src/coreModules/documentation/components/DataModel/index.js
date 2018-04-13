import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import vis from 'vis'
import 'vis/dist/vis.css'
import Model from './Model'
import Property from './Property'

const specifications = require('common/dist/versions')
const models = require('common/dist/models.json')

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      modelId: PropTypes.string.isRequired,
      parameterId: PropTypes.string,
      schemaVersion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

console.log('models', models)

const nodes = []
const edges = []

const modelsToInclude = [
  'individual',
  'identifier',
  'collectionItem',
  'featureObservation',
  'determination',
  'taxonInformation',
  'locationInformation',
  'taxon',
  'preparationType',
  'identifierType',
  'featureType',
  'identifierType',
  'observtionInformation',
  'originInformation',
  'deathInformation',
  'collectingInformation',
  'event',
  'dataRange',
  'dataWrapper',
  'localityInformation',
  'place',
]

const modelsToExclude = [
  'lid',
  'notDefinedModel',
  'curatedListType',
  'curatedList',
  'externalModelReference',
  'agent',
  'curatedEvent',
  'expedition',
]

Object.keys(models).forEach(id => {
  const model = models[id]
  if (
    // modelsToInclude.includes(id) &&
    !modelsToExclude.includes(id) &&
    model &&
    model['x-modelType'] === 'model'
  ) {
    nodes.push({ id, label: id })
    if (model.properties) {
      Object.keys(model.properties).forEach(propertyKey => {
        const property = model.properties[propertyKey]
        const ref =
          (property && property.$ref) || (property.items && property.items.$ref)
        if (ref) {
          edges.push({ from: id, to: ref })
        }
      })
    }
  }
})

const extractModelFromSpecification = ({ modelId, specification }) => {
  return Object.keys(specification.components.schemas)
    .map(key => {
      return { key, ...specification.components.schemas[key] }
    })
    .find(model => {
      return model.key === modelId
    })
}

class DataModel extends Component {
  componentDidMount() {
    const container = document.getElementById('mynetwork')
    console.log('container', container)
    // const nodes = new vis.DataSet([
    //   { id: 1, label: 'individual' },
    //   { id: 2, label: 'identifier' },
    //   { id: 3, label: 'collectionItem' },
    //   { id: 4, label: 'featureObservation' },
    //   { id: 5, label: 'determination' },
    //   { id: 6, label: 'taxonInformation' },
    //   { id: 'mjau', label: 'taxon' },
    //   // { id: 8, label: 'preparationType' },
    //   // { id: 9, label: 'identifierType' },
    //   // { id: 10, label: 'featureType' },
    //   // { id: 11, label: 'identifierType' },
    //   // { id: 12, label: 'observtionInformation' },
    //   // { id: 13, label: 'originInformation' },
    //   // { id: 14, label: 'deathInformation' },
    //   // { id: 15, label: 'collectingInformation' },
    //   // { id: 16, label: 'event' },
    //   // { id: 17, label: 'dataRange' },
    //   // { id: 18, label: 'dataWrapper' },
    //   // { id: 19, label: 'localityInformation' },
    //   // { id: 20, label: 'place' },
    // ])

    // // create an array with edges
    // const edges = new vis.DataSet([
    //   { from: 'mjau', to: 5, label: 'has many' },
    //   { from: 'mjau', to: 6 },
    //   { from: 1, to: 4 },
    //   { from: 1, to: 5 },
    //   { from: 1, to: 6 },
    //   { from: 1, to: 3 },
    //   { from: 1, to: 2 },
    // ])
    const data = {
      nodes: nodes,
      edges: edges,
    }
    const options = {
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false,
      },
      layout: {
        randomSeed: 3,
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            type: 'arrow',
          },
        },
      },
      nodes: {
        font: {
          size: 20,
        },
        shape: 'box',
      },
    }

    // initialize your network!
    const network = new vis.Network(container, data, options)
    network.on('click', data => {
      console.log('data', data)
    })
  }
  render() {
    const {
      match: { params: { modelId, parameterId, schemaVersion } },
    } = this.props

    if (!schemaVersion) {
      return <div>Unknown version: {schemaVersion}</div>
    }

    const specification = specifications[schemaVersion].openApi

    const model = extractModelFromSpecification({
      modelId,
      specification,
    })

    if (parameterId) {
      const property = model.properties[parameterId]
      if (model && property) {
        return (
          <div>
            <Property
              model={model}
              property={{ ...property, key: parameterId }}
              version={schemaVersion}
            />
          </div>
        )
      }
    }

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Model model={model} version={schemaVersion} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div style={{ width: '100%', height: 700 }} id="mynetwork" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

DataModel.propTypes = propTypes

export default DataModel
