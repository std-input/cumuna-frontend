export const useCategories = () => {
  const config = useRuntimeConfig()
  const url = `${config.public.BACKEND_URL}/api/categories`

  const { data, pending, error, refresh } = useFetch(url, {
    server: true,
    key: "categories",
  })
  const creating = ref(false)
  const deleting = ref(false)

  const categories = computed(() => {
    const payload = data.value as { categories?: unknown[] } | unknown[] | null

    if (Array.isArray(payload)) return payload
    return payload?.categories ?? []
  })

  const createCategory = async (title: string) => {
    creating.value = true

    try {
      const response = await $fetch<{ category: { id: string; title: string } }>(
        url,
        {
          method: "POST",
          body: { title },
        }
      )

      const createdCategory = response.category
      const payload = data.value as { categories?: unknown[] } | unknown[] | null

      if (Array.isArray(payload)) {
        data.value = [createdCategory, ...payload]
      } else {
        data.value = {
          ...(payload ?? {}),
          categories: [createdCategory, ...(payload?.categories ?? [])],
        }
      }

      return response
    } finally {
      creating.value = false
    }
  }

  const deleteCategory = async (categoryId: string) => {
    deleting.value = true

    try {
      await $fetch(`${url}/${categoryId}`, {
        method: "DELETE",
      })

      const payload = data.value as { categories?: unknown[] } | unknown[] | null

      if (Array.isArray(payload)) {
        data.value = payload.filter((item) => {
          const category = item as { id?: string }
          return category.id !== categoryId
        })
      } else {
        data.value = {
          ...(payload ?? {}),
          categories: (payload?.categories ?? []).filter((item) => {
            const category = item as { id?: string }
            return category.id !== categoryId
          }),
        }
      }
    } finally {
      deleting.value = false
    }
  }

  return {
    data,
    categories,
    pending,
    error,
    refresh,
    creating,
    deleting,
    createCategory,
    deleteCategory,
  }
}
