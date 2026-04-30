export const useLocations = () => {
  const config = useRuntimeConfig()
  const url = `${config.public.BACKEND_URL}/api/locations`

  const { data, pending, error, refresh } = useFetch(url, {
    server: true,
    key: "locations",
  })
  const creating = ref(false)
  const deleting = ref(false)

  const locations = computed(() => {
    const payload = data.value as { locations?: unknown[] } | unknown[] | null

    if (Array.isArray(payload)) return payload
    return payload?.locations ?? []
  })

  const createLocation = async (locationName: string) => {
    creating.value = true

    try {
      const response = await $fetch<{ location: { id: string; location_name: string } }>(
        url,
        {
          method: "POST",
          body: { location_name: locationName },
        }
      )

      const createdLocation = response.location
      const payload = data.value as { locations?: unknown[] } | unknown[] | null

      if (Array.isArray(payload)) {
        data.value = [createdLocation, ...payload]
      } else {
        data.value = {
          ...(payload ?? {}),
          locations: [createdLocation, ...(payload?.locations ?? [])],
        }
      }

      return response
    } finally {
      creating.value = false
    }
  }

  const deleteLocation = async (locationId: string) => {
    deleting.value = true

    try {
      await $fetch(`${url}/${locationId}`, {
        method: "DELETE",
      })

      const payload = data.value as { locations?: unknown[] } | unknown[] | null

      if (Array.isArray(payload)) {
        data.value = payload.filter((item) => {
          const location = item as { id?: string }
          return location.id !== locationId
        })
      } else {
        data.value = {
          ...(payload ?? {}),
          locations: (payload?.locations ?? []).filter((item) => {
            const location = item as { id?: string }
            return location.id !== locationId
          }),
        }
      }
    } finally {
      deleting.value = false
    }
  }

  return {
    data,
    locations,
    pending,
    error,
    refresh,
    creating,
    deleting,
    createLocation,
    deleteLocation,
  }
}
