import { defineStore } from 'pinia'
import categoryService, { CategoryData, CategoryResponse } from '../services/categoryService'

export interface TransformedCategoryData {
  id: number
  name: string
  slug: string
  description: string
  cover_image_id: number
  thumbnail_id: number
}

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [] as TransformedCategoryData[],
    pagination: null as CategoryResponse['pagination'] | null,
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async fetchCategories(page = 1) {
      this.isLoading = true
      this.error = null

      try {
        const response = await categoryService.fetchCategories(page)
        this.categories = response.data.map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          cover_image_id: category.cover_image?.id || 0,
          thumbnail_id: category.thumbnail?.id || 0
        }))
        this.pagination = response.pagination
      } catch (err) {
        console.error('Error fetching categories:', err)
        this.error = 'Failed to load categories'
      } finally {
        this.isLoading = false
      }
    }
  }
})
