import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/announcement')({
  beforeLoad: () => {
    return {
      title: "Pengumuman",
    };
  },
})

