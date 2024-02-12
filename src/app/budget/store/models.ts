export type Action<T extends string = string> = {
  type: T
}

export type PayloadAction<T extends string = string, P = undefined> = {
  payload: P
} & Action<T>