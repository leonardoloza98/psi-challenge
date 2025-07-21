export const queryKeys = {
  professionals: {
    all: ['professionals'] as const,
    lists: () => [...queryKeys.professionals.all, 'list'] as const,
    list: (filters: { search?: string; category?: string; page?: number; limit?: number }) =>
      [...queryKeys.professionals.lists(), filters] as const,
    details: () => [...queryKeys.professionals.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.professionals.details(), id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: () => [...queryKeys.bookings.lists()] as const,
  },
} as const 