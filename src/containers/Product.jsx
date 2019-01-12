import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appColor } from 'modules/theme';

import { getRepos } from 'actions/index';
import { STATUS } from 'constants/index';

import { Box, Flex, Heading, Link, Image, Paragraph, theme, utils } from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const ProductGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Box)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  > a {
    margin-bottom: ${spacer(2)};
  }

  img {
    height: 8rem;
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  a {
    display: block;
  }

  small {
    color: ${grays.gray60};
  }
`;

export class Product extends React.Component {
  state = {
    query: 'react',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  render() {
    const { query } = this.state;
    const { github } = this.props;
    const data = github.repos.data[query] || [];
    let output;

    if (github.repos.status === STATUS.READY) {
      if (data.length) {
        output = (
          <ProductGrid data-type={query} data-testid="ProductGrid">
            {github.repos.data[query].map(d => (
              <li key={d.id}>
                <Item>
                  <Link href={d.html_url}>
                    <Image src={d.owner.avatar_url} alt={d.owner.login} />
                  </Link>
                  <ItemHeader>
                    <Link href={d.html_url}>
                      <Heading as="h5" lineHeight={1}>
                        {d.name}
                      </Heading>
                      <small>{d.owner.login}</small>
                    </Link>
                  </ItemHeader>
                  <Paragraph>{d.description}</Paragraph>
                </Item>
              </li>
            ))}
          </ProductGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="GitHub" data-testid="GitHubWrapper">
        <Flex justifyContent="center" />
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { github: state.github };
}

export default connect(mapStateToProps)(Product);