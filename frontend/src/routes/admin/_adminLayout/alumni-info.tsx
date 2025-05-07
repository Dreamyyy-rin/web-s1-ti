import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/alumni-info')({
  beforeLoad: () => {
    return {
      title: "Berita Alumni",
    };
  },
})

