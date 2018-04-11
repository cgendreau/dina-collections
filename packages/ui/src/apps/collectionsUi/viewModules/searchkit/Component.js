import React from 'react'

// import PropTypes from 'prop-types'
import {
  ActionBar,
  ActionBarRow,
  HierarchicalMenuFilter,
  Hits,
  HitsStats,
  Layout,
  LayoutBody,
  LayoutResults,
  NoHits,
  RefinementListFilter,
  ResetFilters,
  SearchBox,
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider,
  SelectedFilters,
  SideBar,
  TopBar,
} from 'searchkit'
import { Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const searchkit = new SearchkitManager('/api/specimen-search')

const Item = props => {
  return (
    <div style={{ marginBottom: 20, widht: '100%', float: 'left' }}>
      {props && JSON.stringify(props)}
    </div>
  )
}

const Settings = props => {
  return (
    <SearchkitProvider searchkit={searchkit}>
      <div style={{ paddingLeft: 100 }}>
        <Layout>
          <TopBar style={{ left: 100 }}>
            <SearchBox />
          </TopBar>
          <LayoutBody>
            <SideBar>
              <HierarchicalMenuFilter
                fields={['identifiers.identifier.identifierType']}
                id="categories"
                title="Categories"
              />
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats />
                </ActionBarRow>

                <ActionBarRow>
                  <SelectedFilters />
                  <ResetFilters />
                </ActionBarRow>
              </ActionBar>
              <Hits hitsPerPage={10} itemComponent={Item} mod="sk-hits-grid" />
              <NoHits />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </div>
    </SearchkitProvider>
  )
}

// Settings.propTypes = propTypes

export default Settings

// <RefinementListFilter
//   field="actors.raw"
//   id="actors"
//   operator="AND"
//   size={10}
//   title="Actors"
// />
