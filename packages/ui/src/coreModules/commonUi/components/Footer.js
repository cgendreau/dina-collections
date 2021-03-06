import React from 'react'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default () => {
  const size = 'large'
  return (
    <Segment id="footer" inverted style={{ padding: '5em' }} vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as="h4" content="Site" inverted />
              <List inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="home" />
                    <NavLink to="/">Start</NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="user" />
                    <NavLink to="/login">Login</NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink to="/docs">Data model</NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Documentation" inverted />
              <List inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="wikipedia" />
                    <a href="https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!">
                      DINA wiki
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink to="/docs">Data model</NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Developer" inverted />
              <List inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="github" />
                    <a href="https://github.com/DINA-Web">DINA-Web Github</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <a href="https://github.com/DINA-Web/dina-collections">
                      <Icon name="github" />
                      Collections on Github
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a href="https://dina-test-style.nrm.se/">Style guide</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a href="https://dina-test-api.nrm.se/docs">
                      Api documentation
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a href="/storybook/index.html">Component documentation</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a href="/coverage/index.html">Test coverage</a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}
