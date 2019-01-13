import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import { getRepos, setSelection, setPage } from 'actions/index';
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
    this.handlePageChange = this.handlePageChange.bind(this);
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
    const { dispatch } = this.props;
    dispatch(setSelection(event.target.value));
  }

  handlePageChange(event) {
    // {selected: 1}

    const {
      dispatch,
      selection: { itemPerPage },
    } = this.props;
    const offset = Math.floor(event.selected * itemPerPage);
    dispatch(setPage(offset));
  }

  render() {
    const { query } = this.state;
    const { product, selection } = this.props;
    const data = product.repos.data[query] || [];
    const pageCount =
      selection && selection.itemPerPage ? Math.ceil(data.length / selection.itemPerPage) : 0;
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
                <Select sizing="sm" bordered={false} onChange={this.handleSelect}>
                  {selection.selectionItems.map(val => (
                    <option key={val} value={val}>
                      {val} per page
                    </option>
                  ))}
                </Select>
              </SummaryItem>
            </Summary>
            <Divider />
            selection.currentPage{selection.currentPage}***** selection.itemPerPage{' '}
            {selection.itemPerPage}***** selection.currentPage * selection.itemPerPage{' '}
            {selection.currentPage * selection.itemPerPage}
            <ProductGrid data-type={query} data-testid="ProductGrid">
              {product.repos.data[query]
                .slice(selection.currentPage, selection.itemPerPage)
                .map(d => (
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
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
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
