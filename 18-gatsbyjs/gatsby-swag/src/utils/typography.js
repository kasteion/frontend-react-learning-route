import Typography from "typography"
//import grandViewTheme from "typography-theme-grand-view"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Lato", "Helvetica Neue", "Arial"],
  bodyFontFamily: ["Open Sans", "Roboto", "Georgia"],
})

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography

// import Typography from "typography"
// import grandViewTheme from "typography-theme-grand-view"

// const typography = new Typography(grandViewTheme)

// // Export helper functions
// export const { scale, rhythm, options } = typography
// export default typography
