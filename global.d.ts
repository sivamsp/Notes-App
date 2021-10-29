// This section works with the `typescript-plugin-css-modules` plugin, and
// allows us to type-check the name in our CSS modules (and get IDE completion!)
declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}
