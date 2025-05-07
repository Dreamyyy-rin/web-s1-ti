import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/admin-account')({
  beforeLoad: () => {
    return {
      title: "Akun Admin",
    };
  },
})

