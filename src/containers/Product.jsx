import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { titleColor, borderColor, itemBgColor, subTitleColor, focusedColor } from 'modules/theme';

import { getRepos } from 'actions/index';
import { STATUS } from 'constants/index';

import { Select, Box, Flex, Image, utils } from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
// const { grays } = theme;

const Title = styled.h2`
  color: ${titleColor};
  padding: 0 10px;
  margin: 0;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0 10px;
  color: ${subTitleColor};
`;
const SummaryItem = styled.div`
  margin: 0;
  width: 10%;
  select {
    background-color: #f6f6f6 !important;
  }
`;

const ProductCount = styled.span`
  vertical-align: sub;
`;

const Divider = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${borderColor};
  margin: 0.7em 0.4em;
  padding: 0;
`;
const ProductGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: 0px ${spacer(4)} auto 0;
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
  background: ${itemBgColor};
  align-items: center;
  border: solid 0.1rem ${borderColor};
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
        padding: ${spacer(3)(p)} ${spacer(0)(p)};
      `,
      lg: `
        padding: ${spacer(2)(p)} ${spacer(0)(p)};
      `,
    })};
  /* stylelint-enable */

  > a {
    margin-bottom: ${spacer(2)};
  }

  img {
    height: 20rem;
  }
`;

const ImageSection = styled.div`
  padding: 6px;
  margin: 0;
`;
const DetailsSection = styled.div`
  border-top: 1px solid ${borderColor};
  text-align: left;
  padding-left: ${spacer(3)};
  width: 100%;
  display: block;
  margin-bottom: ${spacer(3)};

  a {
    display: block;
  }
`;

const ItemTitle = styled.h4`
  color: ${titleColor};
  margin: ${spacer(3)} ${spacer(0)} ${spacer(1)} ${spacer(0)};
`;

const ItemDescription = styled.h4`
  color: ${subTitleColor};
  margin: 0px 0px ${spacer(2)} 0px;
`;

const ItemPrice = styled.h6`
  color: ${focusedColor};
  margin: 0;
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
  }

  a:focus,
  a:hover,
  .active a {
    background: #fff;
    outline: unset;
    border-bottom: 3px solid ${focusedColor};
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
          <Fragment>
            <Title>All Products</Title>
            <Summary>
              <SummaryItem>
                <ProductCount>{data.length} Products</ProductCount>
              </SummaryItem>

              <SummaryItem>
                <Select sizing="sm" bordered={false}>
                  <option>8 per page</option>
                  <option>12 per page</option>
                </Select>
              </SummaryItem>
            </Summary>
            <Divider />
            <ProductGrid data-type={query} data-testid="ProductGrid">
              {product.repos.data[query].map(d => (
                <li key={d.id}>
                  <Item>
                    <ImageSection>
                      <Image src={d.product_image} alt="alt" />
                    </ImageSection>
                    <DetailsSection>
                      <ItemTitle>{d.product_name}</ItemTitle>
                      <ItemDescription>{d.description}</ItemDescription>
                      <ItemPrice>{d.price}</ItemPrice>
                    </DetailsSection>
                  </Item>
                  {/* <Image src={d.product_image} alt="alt" /> */}
                  {/* <Item>
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
                </Item> */}
                </li>
              ))}
            </ProductGrid>
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
          </Fragment>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="Product" data-testid="ProductWrapper">
        <Flex justifyContent="center" />
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { product: state.product };
}

export default connect(mapStateToProps)(Product);
