import { CategoryMonth } from "./categoryMonth.model"

export interface CategoryGroup {
  id: string
  name: string
  categories: CategoryMonth[]
}