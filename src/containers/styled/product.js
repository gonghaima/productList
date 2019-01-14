import styled from 'styled-components';
import { titleColor, borderColor, itemBgColor, subTitleColor, focusedColor } from 'modules/theme';

import { Box, utils } from 'styled-minimal';

const { responsive, spacer } = utils;

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
  .active a:hover,
  .active a {
    background: #fff;
    outline: unset;
    border-bottom: 3px solid ${focusedColor};
  }
  .disabled a {
    color: ${subTitleColor};
    cursor: not-allowed;
  }
`;

export {
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
};
