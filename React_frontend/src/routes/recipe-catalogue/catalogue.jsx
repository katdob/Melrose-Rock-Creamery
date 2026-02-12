import { createFileRoute } from '@tanstack/react-router'

function Catalogue() {
  return (
    <div className="content-scroll">
      <h2>Catalogue</h2>
      <p>Browse our community recipe catalogue.</p>
    </div>
  )
}

export const Route = createFileRoute('/recipe-catalogue/catalogue')({
  component: Catalogue,
})
