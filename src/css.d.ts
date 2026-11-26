/** Stylesheets are bundled as plain strings by webpack's `asset/source` rule. */
declare module "*.css" {
  const css: string;
  export default css;
}
