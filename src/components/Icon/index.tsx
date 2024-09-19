import { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {
	color: string
}

const Icon = ({ color, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 403.4 403.413"
	width="1em"
	height="1em"
    {...props}
  >
    <path
      d="M8275.418 2246.215v56.68h143.36v20h-143.36v66.693h-20v-66.693h-56.68v133.373h220.04v20h-240.04v-403.413h86.68v20h-66.68v56.68h66.68v20h-66.68v133.36h56.68v-76.68h76.68v-76.68h86.68v20h-66.68v76.68z"
      style={{
        fill: color,
        fillOpacity: 1,
        fillRule: "nonzero",
        stroke: "none",
        strokeWidth: 1.33333,
      }}
      transform="translate(-8178.738 -2072.855)"
    />
    <path
      d="M8582.138 2072.855v403.413h-96.68v-76.68h-143.36v-20h163.36v76.68h56.68v-210.053h-56.68v66.68h-20v-66.68h-66.68v-20h143.36v-133.36h-56.68v66.68h-20v-66.68h-143.36v-20z"
      style={{
        fill: color,
        fillOpacity: 1,
        fillRule: "nonzero",
        stroke: "none",
        strokeWidth: 1.33333,
      }}
      transform="translate(-8178.738 -2072.855)"
    />
  </svg>
)
export default Icon