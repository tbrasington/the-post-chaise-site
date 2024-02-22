// export interface SanityBlock {
//   _type: "block"
//   [key: string]: any
// }

export interface SanityBlock {
  _key: string
  _type: string
  children: BlockChild[]
  markDefs: any[]
  style: string
}

export interface BlockChild {
  _key: string
  _type: string
  marks: string[]
  text: string
}
