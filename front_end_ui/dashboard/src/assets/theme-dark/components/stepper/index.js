/**
=========================================================
* Viện Dưỡng Lão An Nghỉ MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Viện Dưỡng Lão An Nghỉ MUI base styles
import colors from "assets/theme-dark/base/colors";

// Viện Dưỡng Lão An Nghỉ MUI helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { transparent } = colors;

const stepper = {
  styleOverrides: {
    root: {
      margin: `${pxToRem(48)} 0`,
      padding: `0 ${pxToRem(12)}`,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default stepper;
