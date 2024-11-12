// src/services/categoryService.ts
import apiClient from './axiosInstance'

export interface CategoryData {
  id: number
  name: string
  slug: string
  description: string
  cover_image: {
    id: number
    file_name: string
    file_path: string
    file_size: string
    mime_type: string
  }
  thumbnail: {
    id: number
    file_name: string
    file_path: string
    file_size: string
    mime_type: string
  }
}

export interface CategoryResponse {
  data: CategoryData[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default {
  async fetchCategories(page = 1): Promise<CategoryResponse> {
    const response = await apiClient.get(`/categories?page=${page}`)
    console.log("Fetched categories:", response.data)
    return response.data
  }
}
