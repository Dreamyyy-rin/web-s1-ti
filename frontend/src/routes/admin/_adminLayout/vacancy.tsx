import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/vacancy')({
  beforeLoad: () => {
    return {
      title: "Lowongan"
    }
  },
})

