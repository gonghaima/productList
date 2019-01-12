import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
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

const Pagination = styled.div`
  display: flex;
  flex-direction: row-reverse;
  ul {
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
  }

  li {
    display: inline-block;
  }
  a {
    z-index: 3;
    color: #000;
    cursor: pointer;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    text-decoration: none;
    background-color: #fff;
  }

  a:hover {
    border-bottom: 3px solid #337ab7;
  }
  a:focus {
    outline: unset;
    border-bottom: 6px solid #337ab7;
  }
`;

export class Product extends React.Component {
  state = {
    query: 'react',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  render() {
    const { query } = this.state;
    const { product } = this.props;
    const data = product.repos.data[query] || [];
    let output;

    if (product.repos.status === STATUS.READY) {
      if (data.length) {
        output = (
          <ProductGrid data-type={query} data-testid="ProductGrid">
            {product.repos.data[query].map(d => (
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
      <div key="Product" data-testid="GitHubWrapper">
        <Flex justifyContent="center" />
        {output}
        <Pagination>
          <ReactPaginate
            previousLabel={'< previous'}
            nextLabel={'next >'}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={() => {}}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </Pagination>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { product: state.product };
}

export default connect(mapStateToProps)(Product);
