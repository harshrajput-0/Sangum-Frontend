import { ErrorState } from "@/modules/pages/system/components/ErrorState"

const NotFound = () => {
  return (
    <ErrorState variant="crash" code={404} title="Page not found" message="Looks like you've taken a wrong turn" size="lg" />
  )
}

export default NotFound