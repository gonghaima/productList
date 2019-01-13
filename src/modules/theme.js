export const headerHeight = 70;

export const appColor = '#00b4d5';
export const mainBgColor = '#f6f8fa';
export const borderColor = '#E5E5E5';
export const anchorHoverColor = '#337ab7';
export const itemBgColor = '#ffffff';

export const easing = 'cubic-bezier(0.35, 0.01, 0.77, 0.34);';

export default {
  breakpoints: [400, 768, 1024, 1280, 1920],
  palette: {
    primary: appColor,
    mainBgColor,
    borderColor,
    anchorHoverColor,
  },
  button: {
    borderRadius: {
      xs: 4,
      lg: 28,
      xl: 32,
    },
    padding: {
      lg: [12, 28],
      xl: [14, 32],
    },
  },
};
