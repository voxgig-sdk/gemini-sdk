
import { inspect } from 'node:util'

import { GeminiEntityBase } from '../GeminiEntityBase'

import type {
  GeminiSDK,
} from '../GeminiSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  ListModel,
} from '../GeminiTypes'

// TODO: needs Entity superclass
class ListModelEntity extends GeminiEntityBase<ListModel> {

  constructor(client: GeminiSDK, entopts: any) {
    super(client, entopts)
    this.name = 'list_model'
    this.name_ = 'list_model'
    this.Name = 'ListModel'
  }


  make(this: ListModelEntity) {
    return new ListModelEntity(this._client, this.entopts())
  }







}


export {
  ListModelEntity
}
