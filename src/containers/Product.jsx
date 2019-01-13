import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import { getRepos, setSelection } from 'actions/index';
import { STATUS } from 'constants/index';

import { Select, Flex, Image } from 'styled-minimal';
import Loader from 'components/Loader';
import {
  Title,
  Summary,
  SummaryItem,
  ProductCount,
  Divider,
  ProductGrid,
  Item,
  ImageSection,
  DetailsSection,
  ItemTitle,
  ItemDescription,
  ItemPrice,
  Pagination,
} from './styled/product';

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'react',
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch(getRepos(query));
  }

  handleSelect(event) {
    console.log('event.target.value--', event.target.value);
    // debugger;
    const { dispatch } = this.props;
    dispatch(setSelection(event.target.value));
  }

  render() {
    const { query } = this.state;
    const { product, selection } = this.props;
    const data = product.repos.data[query] || [];
    let output;
    if (product.repos.status === STATUS.READY) {
      if (data.length) {
        output = (
          <Fragment>
            <Title>All Products</Title>
            <h1>{selection.itemPerPage}</h1>
            <Summary>
              <SummaryItem>
                <ProductCount>{data.length} Products</ProductCount>
              </SummaryItem>

              <SummaryItem>
                <Select sizing="sm" bordered={false} onChange={this.handleSelect}>
                  <option value="8">8 per page</option>
                  <option value="12">12 per page</option>
                </Select>
              </SummaryItem>
            </Summary>
            <Divider />
            <ProductGrid data-type={query} data-testid="ProductGrid">
              {product.repos.data[query].slice(0, Number(selection.itemPerPage)).map(d => (
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
  return { product: state.product, selection: state.selection };
}

export default connect(mapStateToProps)(Product);
