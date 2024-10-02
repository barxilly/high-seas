import { loadingSpinners, sample } from "../../../lib/flavor"

const LoadingSpinner = () => {
  const src = sample(loadingSpinners)
  return (
    <div className="h-16 w-16">
      <img src={src} alt="loading spinner" />
    </div>
  )
}
export { LoadingSpinner }