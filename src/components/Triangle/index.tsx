import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {
	color: string,
  fill: string
}

const Triangle = ({ color, fill, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 364.473 315.516"
    {...props}
  >
    <path
      d="m8815.994 2143.076 286.408 1.324-142.382 246.614z"
      style={{
        fill: fill,
        fillOpacity: 1,
        stroke: color,
        strokeWidth: 45,
        strokeLinecap: "square",
        strokeOpacity: 1,
        transition: '0.2s ease-out'
      }}
      transform="translate(-8776.797 -2120.394)"
    />
  </svg>
)
export default Triangle
